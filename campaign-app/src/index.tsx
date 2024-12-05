import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/home";
import Create from "./views/create";
import AuthProvider from "./context/AuthProvider";
import Notify from "./components/alert";
import Update from "./views/update";
import ImageSlider from "./components/imageSlider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/update",
    element: <Update />,
  },
]);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Notify />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
