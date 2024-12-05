import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/button";
import { AuthContextType, useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Back from "../components/back";

type Props = {};

const Create = (props: Props) => {
  const { create, message } = useAuth() as AuthContextType;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    daily_budget: string;
    total_budget: string;
    images: File[] | null;
    from: string;
    to: string;
  }>({
    name: "",
    daily_budget: "",
    total_budget: "",
    images: null,
    from: "",
    to: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    create(formData, setFormData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    if (value) setFormData((prev) => ({ ...prev, [e?.target?.name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
      setFormData((prev) => ({ ...prev, images: filesArray }));
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    setFormData((prev) => ({ ...prev, images: newFiles }));
  };

  return (
    <div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
      <Back />
      <div className="h-fit min-w-[420px] w-1/3 bg-white space-y-8 px-10 py-8 pb-14 border border-slate-500 rounded-lg">
        <h3 className="font-bold text-4xl tracking-wider text-slate-700 text-center">
          Create Campaign
        </h3>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5 w-full"
        >
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
              label="Images"
              name="images"
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
            <ul className="mt-3 space-y-1">
              {formData?.images?.map((file, index) => (
                <li
                  className="w-full flex py-1 px-4 rounded-md justify-between bg-slate-100"
                  key={index}
                >
                  {file.name}
                  <button
                    className="bg-red-300 border border-red-400 font-semibold text-white pb-1.5 px-3 rounded-full"
                    type="button"
                    onClick={() => removeFile(index)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
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

export default Create;
