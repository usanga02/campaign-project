import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { Campaign } from "../types/campaign";

export type AuthContextType = {
  user: {
    email: string;
    name: string;
    role: "ADMIN" | "USER";
    access_token: string;
    id: number;
  } | null;
  create: (formData: any, setFormData: any) => void;
  update: (formData: any, campaignId: string) => void;
  getCampaign: (campaignId: string) => Promise<Campaign | any>;
  logout: () => void;
  getImages: (campaignId: string) => Promise<void>;
  message: {
    variant: "error" | "success";
    message: string;
  } | null;

  openModal: boolean;
  handleCloseModal: () => void;
  images: string[] | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const loggedInUser = localStorage.getItem("site");
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState<string[] | null>(null);

  const [user, setUser] = useState<{
    email: string;
    name: string;
    role: "ADMIN" | "USER";
    access_token: string;
    id: number;
  } | null>(loggedInUser ? JSON.parse(loggedInUser ?? "") : null);

  const [message, setMessage] = useState<{
    variant: "error" | "success";
    message: string;
  } | null>(null);

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    let messageTimer: NodeJS.Timeout;
    if (message != null) {
      messageTimer = setTimeout(() => setMessage(null), 4000);
    }
  }, [message]);

  const getCampaign = async (campaignId: string): Promise<Campaign | any> => {
    try {
      const res = await axiosInstance.get(`/campaigns/${campaignId}`);
      return res.data.data;
    } catch (error: any) {
      if (error.response.status == 404) {
        setMessage({ variant: "error", message: "Campaign not found!" });
      } else {
        setMessage({ variant: "error", message: "Something went wrong" });
      }
    }
  };

  const getImages = async (campaignId: string) => {
    try {
      const res = await axiosInstance.get(`/campaigns/${campaignId}/images`);
      setImages(res.data.images);
      setOpenModal(true);
    } catch (error: any) {
      if (error.response.status == 404) {
        setMessage({ variant: "error", message: "Images not found!" });
      } else {
        setMessage({ variant: "error", message: "Something went wrong" });
      }
    }
  };

  const create = async (formData: any, setFormData: any) => {
    try {
      const res = await axiosInstance.postForm("/campaigns", {
        ...formData,
      });
      setMessage({
        variant: "success",
        message: "Campaign created successfully",
      });

      setFormData({
        name: "",
        daily_budget: "",
        total_budget: "",
        files: "",
        from: "",
        to: "",
      });
    } catch (e: any) {
      if (e.response.data) {
        setMessage({
          variant: "error",
          message: e.response.data.message,
        });
      } else {
        setMessage({
          variant: "error",
          message: "Something went wrong!",
        });
      }
    }
  };

  const update = async (formData: any, campaignId: string) => {
    try {
      await axiosInstance.patch(`/campaigns/${campaignId}`, {
        ...formData,
      });
      setMessage({
        variant: "success",
        message: "Campaign updated successfully",
      });
    } catch (e: any) {
      if (e.response.data) {
        setMessage({
          variant: "error",
          message: e.response.data.message,
        });
      } else {
        setMessage({
          variant: "error",
          message: "Something went wrong!",
        });
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        create,
        logout,
        update,
        message,
        getCampaign,
        openModal,
        handleCloseModal,
        images,
        getImages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext) as AuthContextType;
