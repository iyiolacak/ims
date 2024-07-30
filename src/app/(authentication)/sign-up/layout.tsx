import React from "react";
import AuthHeader from "../_components/AuthHeader";
import SignUpPageOtherHalf from "./_components/SignUpPageOtherHalf";
import { SignUpFormProvider } from "@/context/SignUpFormContext";
import SignUpStageIndicator from "./_components/SignUpStageIndicator";
import { SignUpProvider } from "@/context/SignUpContext";
const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignUpProvider>
      <SignUpFormProvider>
        <div className="flex min-h-screen w-full flex-row">
          {/* add overflow-y-hidden */}
          <div className="flex w-full flex-row">
            <div className="flex h-full lg:w-1/2">
              <div className="mx-auto flex max-w-lg flex-col">
                {children}
                <SignUpStageIndicator outOf={3} />
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <SignUpPageOtherHalf />
            </div>
          </div>
        </div>
      </SignUpFormProvider>
    </SignUpProvider>
  );
};

export default SignUpLayout;
