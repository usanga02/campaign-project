import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/button";
import { AuthContextType, useAuth } from "../context/AuthProvider";
import { useSearchParams } from "react-router-dom";
import Back from "../components/back";

type Props = {};

const Update = (props: Props) => {
  const { update, message, getCampaign } = useAuth() as AuthContextType;
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const [formData, setFormData] = useState({
    name: "",
    daily_budget: "",
    total_budget: "",
    files: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    const res = getCampaign(campaignId!);
    res.then((res) => res && setFormData({ ...res, files: "" }));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    update(formData, campaignId!);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
      <Back />
      <div className="h-fit min-w-[420px] bg-white w-1/3 space-y-8 px-10 py-8 pb-14 border border-slate-500 rounded-lg">
        <h3 className="font-bold text-4xl tracking-wider text-slate-700 text-center">
          Update Campaign
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 w-full">
          <div className="col-span-2">
            <Input
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="End Bad Governance"
            />
          </div>
          <Input
            label="Daily Budget"
            name="daily_budget"
            type="number"
            value={formData.daily_budget}
            onChange={handleChange}
            placeholder="100.00"
          />
          <Input
            label="Total Budget"
            name="total_budget"
            type="number"
            value={formData.total_budget}
            onChange={handleChange}
            placeholder="10000.00"
          />
          <Input
            label="From"
            name="from"
            type="date"
            value={formData.from}
            onChange={handleChange}
          />
          <Input
            label="To"
            name="to"
            type="date"
            value={formData.to}
            onChange={handleChange}
          />
          <div className="col-span-2">
            <Input
              label="Files"
              name="files"
              type="file"
              value={formData.files}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <Button
              disabled={
                formData.name == "" ||
                formData.daily_budget == "" ||
                formData.total_budget == "" ||
                formData.to == "" ||
                formData.from == ""
              }
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
