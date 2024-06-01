import NavBar from "@/components/NavBar";
import React from "react";
import Sidebar from "./components/Sidebar";
import WelcomeSection from "./components/WelcomeSection";
import ModalProvider from "./components/ModalProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <div className="h-screen overflow-hidden flex flex-col">
        <div className="flex flex-row flex-grow overflow-hidden">
          <Sidebar />
          <div className="flex-grow p-6 overflow-auto">{children}</div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default Layout;
