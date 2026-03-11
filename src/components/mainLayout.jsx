import React from "react";
import { Outlet } from "react-router-dom";
//import { Navbar } from "../components/layoutDashboard";

const MainLayout = () => {
  return (
    <div className="flex flex-1 flex-col h-screen">
      {/* <Navbar /> */}
      
        <Outlet />
      
    </div>
  );
};

export default MainLayout;
