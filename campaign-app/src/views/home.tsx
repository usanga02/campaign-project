import { useEffect, useState } from "react";
import CampaignList from "../components/campaignList";
import axiosInstance from "../utils/axiosInstance";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/paginate";
import ImageSlider from "../components/imageSlider";

function Home() {
  const [campaigns, setCampaigns] = useState({
    data: [],
    links: {},
    meta: {},
  });
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/campaigns");
      setCampaigns(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = async (link: string) => {
    try {
      const res = await axiosInstance.get(link);
      setCampaigns(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="justify-items-center bg-slate-100 min-h-screen py-2">
      <ImageSlider />
      <h1 className="text-center mb-5 font-bold text-4xl text-slate-700">
        Campaign Advertising
      </h1>
      {campaigns.data.length > 0 ? (
        <>
          <CampaignList campaigns={campaigns?.data} />
          <Pagination
            links={campaigns.links}
            meta={campaigns.meta}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="w-full justify-items-center">
          <div className="mt-48 mb-10 flex justify-end">
            <Button variant="secondary" onClick={() => navigate("/create")}>
              Create Campaign
            </Button>
          </div>
          <p className="font-semibold">
            There are no campaign here, click the{" "}
            <span className="text-slate-400 font-bold">Create Campaign</span>{" "}
            button
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
