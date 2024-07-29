import React from "react";
import AuthHeader from "../_components/AuthHeader";
import SignUpPageOtherHalf from "./_components/SignUpPageOtherHalf";
import { SignUpFormProvider } from "@/context/SignUpFormContext";
const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignUpFormProvider>

    <div className="flex min-h-screen w-full flex-row">
      {/* add overflow-y-hidden */}
      <div className="flex w-full flex-row">
        <div className="flex h-full justify-center w-full lg:w-1/2">{children}</div>
        <div className="hidden lg:block lg:w-1/2">
          <SignUpPageOtherHalf />
        </div>
      </div>
    </div>
    </SignUpFormProvider>
  );
};

export default SignUpLayout;
