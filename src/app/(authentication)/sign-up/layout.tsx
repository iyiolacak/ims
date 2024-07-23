import React from "react";
import AuthHeader from "../_components/AuthHeader";
import SignUpPageOtherHalf from "./_components/SignUpPageOtherHalf";

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-full flex-col">
      <AuthHeader />
      <div className="flex flex-row">
        <div className="mx-auto flex h-full justify-center md:w-2/6">
          {children}
        </div>
        <div className="md:w-1/2">
        <SignUpPageOtherHalf/>
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;
