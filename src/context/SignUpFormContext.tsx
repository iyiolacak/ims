"use client";
import { TSignUpFormValues } from "@/app/(authentication)/sign-up/_components/SignUpForm";
import React, { useState, createContext, useContext } from "react";

const SignUpFormContext = createContext<SignUpFormContextValue | undefined>(
  undefined,
);
// Define a type for the context value
interface SignUpFormContextValue {
  // You can reflect what user submitted e.g. email string on OTP page
  submittedFormData: Partial<TSignUpFormValues>;
  setSubmittedFormData: React.Dispatch<React.SetStateAction<Partial<TSignUpFormValues>>>;
  // Disable while data being submitting and sending to API
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  // Make stage global
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  
}
const SignUpFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [submittedFormData, setSubmittedFormData] = useState<Partial<TSignUpFormValues>>({
    email: "",
  });
const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
const [stage, setStage] = useState<number>(1)

  return (
    <SignUpFormContext.Provider value={{ submittedFormData, setSubmittedFormData, isSubmitting, setIsSubmitting, stage, setStage }}>
      {children}
    </SignUpFormContext.Provider>
  );
};

const useSignUpFormContext = () => {
  const context = useContext(SignUpFormContext);
  if (context === undefined) {
    throw new Error(
      "useSignUpContext must be used within a SignUpFormProvider",
    );
  }
  return context;
};

export { SignUpFormProvider, useSignUpFormContext };
