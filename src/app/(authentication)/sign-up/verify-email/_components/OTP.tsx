"use client";
import OTPForm from "./OTPForm";
import { useSignUpFormContext } from "@/context/SignUpFormContext";
import { PencilLine } from "lucide-react";
import SignUpStageIndicator from "../../_components/SignUpStageIndicator";

const VerifyEmail = () => {

  
  const { submittedFormData } = useSignUpFormContext();
  return (
    <div className="flex h-full w-full   px-4">
      <div className="flex w-full flex-col h-full">
        <div className="flex flex-col items-center justify-center flex-grow">
          {/* Section Header */}
          <div className="w-full">
            <div className="mb-5 text-center">
              <h2 className="scroll-m-20 text-2xl font-bold tracking-tight transition-colors first:mt-0 md:text-[34px]">
                We&apos;ve just sent you an email.
              </h2>
              <h3 className="text-[16px] scroll-m-20 font-normal tracking-tight md:mt-4">
                Enter the security code we sent to
                <span className="inline-flex cursor-pointer items-center rounded-md px-1 font-medium text-primary hover:bg-blue-100">
                  {submittedFormData.email}
                  <PencilLine className="ml-0.5" size={20} />
                </span>
              </h3>
            </div>
            <OTPForm />
            <div className="mt-10 text-center">
              <h3 className="text-md font-normal tracking-tight">
                Didn&apos;t receive a code yet?
                <span className="ml-0.5 cursor-pointer rounded-lg p-1 font-medium text-primary transition-colors hover:bg-blue-100">
                  Send a new code
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
