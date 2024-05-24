import NavBar from "@/components/NavBar";
import React from "react";
import Sidebar from "./components/Sidebar";
import WelcomeSection from "./components/WelcomeSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-full flex flex-row">
        <Sidebar/>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
