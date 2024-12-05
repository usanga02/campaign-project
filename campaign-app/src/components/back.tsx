import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Back = (props: Props) => {
  const navigate = useNavigate();
  return (
    <button
      className="absolute top-5 font-extrabold hover:bg-slate-50 hover:text-slate-600 bg-slate-500 rounded-md text-slate-100 left-5 pb-2 pt-1 px-5"
      onClick={() => navigate(-1)}
    >
      {`<---`}
    </button>
  );
};

export default Back;
