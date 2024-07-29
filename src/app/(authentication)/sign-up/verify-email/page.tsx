"use client";
import React from "react";
import OTPForm from "./_components/OTPForm";
import { useSignUpFormContext } from "@/context/SignUpFormContext";
import { PencilLine } from "lucide-react";

const VerifyEmail = () => {
  // Upstate the focus ref of the OTP.
  const { submittedFormData } = useSignUpFormContext();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="px-4 md:px-3">
        {/* Section Header */}
        <div className="mb-5">
          <h2 className="scroll-m-20 text-center text-2xl font-bold tracking-tight transition-colors first:mt-0 md:text-[40px]">
            We&apos;ve just sent you a code.
          </h2>
          <h3 className="text-md md:text-md scroll-m-20 text-center font-normal tracking-tight md:mt-4">
            Enter the verification code sent to
            {/* FEATURE TO-DO: Hover card email edit. Same UI as first step on the hover card and input form on the hover card. */}
            <span className="inline-flex text-primary font-medium items-center cursor-pointer px-1 rounded-md hover:bg-blue-100">{submittedFormData.email} <PencilLine className="ml-0.5" size={20}/></span>
          </h3>
        </div>
        <OTPForm />
        <div className="mt-10 flex justify-center">
          <h3 className="">
            Didn&apos;t receive a code yet?
            <span className="ml-0.5 cursor-pointer rounded-lg p-1 font-medium text-primary transition-colors hover:bg-blue-100">
              Send a new code
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
