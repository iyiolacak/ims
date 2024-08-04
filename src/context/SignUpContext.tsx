// SignUpContext.tsx

// To-do: Centralize the multi-step form handling here.

"use client";
import { useSignUp } from "@clerk/clerk-react";
import { ClerkAPIError, SetActive, SignUpResource } from "@clerk/types";
import React, { createContext, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleClerkError } from "@/app/(authentication)/clerkErrorHandler";
import { useRouter } from "next/navigation";
import SignUp from "@/app/(authentication)/sign-up/page";

// Types

export enum SubmissionStatus {
  Idle = "Idle",
  Submitting = "Submitting",
  Success = "Success",
  Error = "Error",
}
export enum SignUpStage {
  Form = "Form",
  Verifying = "Verifying",
  Completed = "Completed",
}

export const OTPCodeSchema = z.object({
  OTPCode: z.string().min(6),
});

export type TOTPCode = z.infer<typeof OTPCodeSchema>;

type SignUpContextValue = {
  isLoaded: boolean;
  signUp: SignUpResource | undefined;
  setActive: SetActive | undefined;
  onSubmit: (data: TSignUpFormValues) => void;
  onOTPSubmit: (data: TOTPCode) => void;
  signUpStage: SignUpStage;
  submissionStatus: SubmissionStatus;
  serverError: ClerkAPIError[] | null;
};
// Form values type
export type TSignUpFormValues = z.infer<typeof signUpSchema>;

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const SignUpContext = createContext<SignUpContextValue | undefined>(undefined);

const SignUpProvider = ({ children }: { children: React.ReactNode }) => {

  const methods = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(
    SubmissionStatus.Idle,
  );
  const [serverError, setServerError] = useState<ClerkAPIError[] | null>(null);
  const [signUpStage, setSignUpStage] = useState<SignUpStage>(SignUpStage.Form);
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  // To-do: Remove isSuccess and isSubmitting to an enum state, FormState

  // SignUpContext.tsx
  const onSubmit = async (data: TSignUpFormValues) => {
    if (!isLoaded) return;
    setSubmissionStatus(SubmissionStatus.Submitting)
    try {
      await signUp.create({ emailAddress: data.email });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
        // You might want to update your UI state here to show a verification form
      });
      setSignUpStage(SignUpStage.Verifying);
      setSubmissionStatus(SubmissionStatus.Success)
    } catch (error) {
      const clerkErrors = handleClerkError(error);
      setServerError(clerkErrors);
      setSubmissionStatus(SubmissionStatus.Error)
    }
  };

  const onOTPSubmit = async (OTPCodeData: TOTPCode) => {
    if(!isLoaded || !signUp) return;

    setSubmissionStatus(SubmissionStatus.Submitting);
    try {
      await signUp.attemptEmailAddressVerification({ code: OTPCodeData.OTPCode })
      setSignUpStage(SignUpStage.Completed);
      setSubmissionStatus(SubmissionStatus.Success);
      router.push("/dashboard")
    } catch(error) {
      const clerkErrors = handleClerkError(error)
      setServerError(clerkErrors);
      setSubmissionStatus(SubmissionStatus.Error)
    }
  }

  return (
    <SignUpContext.Provider value={{ isLoaded, signUp, setActive, onSubmit, submissionStatus, signUpStage, serverError, onOTPSubmit }}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </SignUpContext.Provider>
  );
};

const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUpContext must be used within SignUpProvider");
  }
  return context;
};

export { useSignUpContext, SignUpProvider };
