import React from "react";
import CampaignCard from "./campaignCard";
import Button from "./button";
import { useNavigate } from "react-router-dom";

type Props = {
  campaigns: any[];
};

const CampaignList = ({ campaigns }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-fit min-h-[70vh]">
      <div className="pb-5 flex justify-end">
        <Button variant="secondary" onClick={() => navigate("/create")}>
          Create Campaign
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {campaigns.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign}></CampaignCard>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
