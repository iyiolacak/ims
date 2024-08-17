// SignUpContext.tsx

// To-do: Centralize the multi-step form handling here.

"use client";
import { useSignUp } from "@clerk/clerk-react";
import {
  ClerkAPIError,
  OAuthStrategy,
  SetActive,
  SignUpResource,
} from "@clerk/types";
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

type UseSignUpReturn =
  | {
      isLoaded: false;
      signUp: undefined;
      setActive: undefined;
    }
  | {
      isLoaded: true;
      signUp: SignUpResource;
      setActive: SetActive;
    };



export interface BaseAuthContextValue extends ReturnType<typeof useAuthStatus> {
  handleOAuthClick: (strategy: OAuthStrategy) => void;
}

export interface SignUpContextValue {
  onSignUpFormSubmit: (data: ) => Promise<void>;
  onOTPSubmit: (data: OTPCodeType) => Promise<void>;
}


//
//
//

const BaseAuthContext = createContext<BaseAuthContextValue | undefined>(undefined);



const SignUpProvider = ({ children }: { children: React.ReactNode }) => {


  // Custom hook useAuthStatus call and get the return
  const {
    authState,
    authStage,
    authServerError,
    handleError,
    handleOAuthServerError,
    oauthServerError,
    startSubmission,
    markSuccess,
    resetSubmittingState,
    setStage,
    shake,
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

// 

  const onOTPSubmit = async (OTPCodeData: OTPCodeType) => {
    if (!isLoaded || !signUp) return;

    startSubmission();
    try {
      await signUp.attemptEmailAddressVerification({
        code: OTPCodeData.OTPCode,
      });
      setStage(AuthStage.Completed);
      markSuccess();
      await setActive({
        session: signUp.createdSessionId,
      });
      router.push("/dashboard");
    } catch (error) {
      const clerkErrors = getClerkError(error); // Returns err.errors | (property) ClerkAPIResponseError.errors: ClerkAPIError[]
      if (clerkErrors) {
        handleError(clerkErrors); // Turns auth state AuthState.Error, gets the errors on the error state to reflect on the UI.
      } 
    } 
  };

  // 

  const handleOAuthClick = async (strategy: OAuthStrategy) => {
    if (!signUp) return null;
    try {
      startSubmission();
      await signUp?.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/onboarding",
      });
      markSuccess();
    } catch (err) {
      const clerkErrors = getClerkError(err);
      if (clerkErrors) {
        handleOAuthServerError(clerkErrors);
      }
    } finally {
      resetSubmittingState();
    }
  };

  const baseAuthValue = {
    authState,
    authStage,
    authServerError,
    handleError,
    handleOAuthServerError,
    startSubmission,
    markSuccess,
    resetSubmittingState,
    setStage,
    shake,
    handleOAuthClick,
    oauthServerError,

  }

  return (
    <BaseAuthContext.Provider value={baseAuthValue}>
    <SignUpContext.Provider
      value={{
        onSignUpFormSubmit,
        onOTPSubmit,
      }}
      >
      {authStage === AuthStage.Form && (
        <FormProvider {...signUpMethods}>{children}</FormProvider>
      )}
      {authStage === AuthStage.Verifying && (
        <FormProvider {...otpMethods}>{children}</FormProvider>
      )}
    </SignUpContext.Provider>
      </BaseAuthContext.Provider>
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
