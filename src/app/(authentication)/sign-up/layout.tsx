import React from "react";
import AuthHeader from "../_components/AuthHeader";
import SignUpPageOtherHalf from "./_components/SignUpPageOtherHalf";

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen flex-row ">
      {/* add overflow-y-hidden */}
      <div className="w-full flex flex-row">
        <div className="flex h-full justify-center md:w-1/2">
          {children}
        </div>
        <div className="hidden md:block md:w-1/2">
        <SignUpPageOtherHalf/>
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;
