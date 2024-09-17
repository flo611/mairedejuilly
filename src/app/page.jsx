"use client";

import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../middleware/rooter/provider"; // Import correct de router

const Router = () => {
  return (
    <RouterProvider router={router} />  
  );
};

export default Router;
