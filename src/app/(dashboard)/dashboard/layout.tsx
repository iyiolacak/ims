import NavBar from "@/components/NavBar";
import React from "react";
import Sidebar from "./components/Sidebar";
import WelcomeSection from "./components/WelcomeSection";
import ModalProvider from "./components/ModalProvider";
import { UserProvider } from "@/context/UserContext";
import ToastProvider from "@/context/ToastProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ToastProvider>
        <ModalProvider>
          <div className="flex h-screen flex-col overflow-hidden">
            <div className="flex flex-grow flex-row overflow-hidden">
              <Sidebar />
              <div className="flex-grow overflow-auto p-6">{children}</div>
            </div>
          </div>
        </ModalProvider>
      </ToastProvider>
    </UserProvider>
  );
};

export default Layout;
