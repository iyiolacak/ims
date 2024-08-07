// SignUpContext.tsx

// To-do: Centralize the multi-step form handling here.

"use client";
import { useSignUp } from "@clerk/clerk-react";
import { ClerkAPIError, SetActive, SignUpResource } from "@clerk/types";
import React, { createContext, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClerkError as getClerkError } from "@/app/(authentication)/clerkErrorHandler";
import { useRouter } from "next/navigation";
import SignUp from "@/app/(authentication)/sign-up/page";
import { AuthStage, AuthState, useAuthStatus } from "@/hooks/useAuthStatus";

// 
// Types
// 

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
// Validation schema as z object - are sent to OTPForm component.
export const otpCodeSchema = z.object({
  OTPCode: z.string().min(6),
});

export type OTPCodeType = z.infer<typeof otpCodeSchema>;

export type SignUpContextValue = {
  onSignUpFormSubmit: (data: SignUpFormValuesType) => Promise<void>;
  onOTPSubmit: (data: OTPCodeType) => void;
  authStage: AuthStage;
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  shake: boolean;
};

export type SignUpFormValuesType = z.infer<typeof signUpSchema>;

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// 
// 
// 

const SignUpContext = createContext<SignUpContextValue | undefined>(undefined);

const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  
  // Send the methods from the center(SignUpContext -> SignUpForm || OTPForm)
  const signUpMethods = useForm<SignUpFormValuesType>({
    resolver: zodResolver(signUpSchema),
  });
  const otpMethods = useForm<OTPCodeType>({
    resolver: zodResolver(otpCodeSchema),
  });

  // Custom hook useAuthStatus call and get the return
  const {
    startSubmission,
    authState,
    authStage,
    authServerError,
    setStage,
    handleError,
    markSuccess,
    shake
    
  } = useAuthStatus();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  // To-do: Remove isSuccess and isSubmitting to an enum state, FormState

  // SignUpContext.tsx
  const onSignUpFormSubmit = async (data: SignUpFormValuesType) => {
    if (!isLoaded) return;
    startSubmission();
    try {
      await signUp.create({ emailAddress: data.email });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
        // You might want to update your UI state here to show a verification form
      });
      setStage(AuthStage.Verifying);
      markSuccess();
    } catch (error) {
      const clerkErrors = getClerkError(error);
      if (clerkErrors) {
        handleError(clerkErrors);
      }
    }
  };

  const onOTPSubmit = async (OTPCodeData: OTPCodeType) => {
    if (!isLoaded || !signUp) return;

    startSubmission();
    try {
      await signUp.attemptEmailAddressVerification({
        code: OTPCodeData.OTPCode,
      });
      setStage(AuthStage.Completed);
      markSuccess();
      router.push("/dashboard");
    } catch (error) {
      const clerkErrors = getClerkError(error); // Returns err.errors | (property) ClerkAPIResponseError.errors: ClerkAPIError[]
      if (clerkErrors) {
        handleError(clerkErrors); // Turns auth state AuthState.Error, gets the errors on the error state to reflect on the UI.
      }
    }
  };

  return (
    <SignUpContext.Provider
      value={{
        onSignUpFormSubmit: onSignUpFormSubmit,
        authStage,
        authState,
        authServerError,
        onOTPSubmit,
        shake,
      }}
    >
      {authStage === AuthStage.Form && (
        <FormProvider {...signUpMethods}>{children}</FormProvider>
      )}
      {authStage === AuthStage.Verifying && (
        <FormProvider {...otpMethods}>{children}</FormProvider>
      )}
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
