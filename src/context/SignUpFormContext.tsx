"use client";
import { TSignUpFormValues } from "@/app/(authentication)/sign-up/_components/SignUpForm";
import React, { useState, createContext, useContext } from "react";

const SignUpFormContext = createContext<SignUpFormContextValue | undefined>(
  undefined,
);
// Define a type for the context value
interface SignUpFormContextValue {
  submittedFormData: Partial<TSignUpFormValues>;
  setSubmittedFormData: React.Dispatch<React.SetStateAction<Partial<TSignUpFormValues>>>;
}
const SignUpFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [submittedFormData, setSubmittedFormData] = useState<Partial<TSignUpFormValues>>({
    email: "",
  });

  return (
    <SignUpFormContext.Provider value={{ submittedFormData, setSubmittedFormData }}>
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
