import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const OutletRouter = () => {
  return (
    <div>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default OutletRouter;
