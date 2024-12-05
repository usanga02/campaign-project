import React, { SetStateAction } from "react";
import { Campaign } from "../types/campaign";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

type Props = {
  campaign: Campaign;
};

const CampaignCard = ({ campaign }: Props) => {
  const { getImages } = useAuth();
  const { name, daily_budget, total_budget, from, to, files } = campaign;
  const navigate = useNavigate();
  return (
    <div className="w-full min-w-80 text-sm font-bold hover:bg-white ">
      <div className="border border-slate-700 px-5 py-3 rounded-md">
        <h3 className="text-xl text-slate-600">{name}</h3>
        <h3>
          Daily Budget: <span className="text-green-800">{daily_budget}</span>
        </h3>
        <h3>
          Total Budget: <span className="text-green-800">{total_budget}</span>
        </h3>
        <h3>
          from: <span className="text-slate-700">{from}</span> - to:{" "}
          <span className="text-slate-700">{to}</span>
        </h3>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button onClick={() => navigate(`/update?campaignId=${campaign.id}`)}>
            Edit
          </Button>
          <Button onClick={() => getImages(String(campaign.id))}>
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
