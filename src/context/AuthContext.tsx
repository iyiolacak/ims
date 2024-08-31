"use client";
import { getClerkError } from "@/app/(authentication)/clerkErrorHandler";
import {
  AuthFormValuesType,
  AuthStage,
  AuthState,
  useAuthStatus,
} from "@/hooks/useAuthStatus";
import { useSignUp as useClerkSignUp } from "@clerk/clerk-react";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Validation schema as z object - are sent to OTPForm component.
export const otpCodeSchema = z.object({
  OTPCode: z.string().min(6, "The one-time password must be 6 digits long"),
});

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type SignUpFormValuesType = z.infer<typeof signUpSchema>;

export type OTPCodeFormValuesType = z.infer<typeof otpCodeSchema>;

export interface AuthContextValue {
  authStage: AuthStage;
  onSignUpFormSubmit: (data: SignUpFormValuesType) => Promise<void>;
  onOTPFormSubmit: (data: OTPCodeFormValuesType) => Promise<void>;
  signUpFormMethods: UseFormReturn<SignUpFormValuesType>;
  signUpOTPMethods: UseFormReturn<OTPCodeFormValuesType>;
  submittedData: AuthFormValuesType | undefined;
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  shakeState: Record<string, boolean>;
  isLoaded: any;
  signUp: any;
  setActive: any;
}
// Sign-up and OTP submission logic functions, `(onSignUpSubmit, onOTPSubmit)`
//

const AuthContext = createContext<AuthContextValue | null>(null);
//
//
//
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useClerkSignUp();
  const {
    setStage,
    handleError,
    markSuccess,
    startSubmission,
    authStage,
    setSubmittedData,
    submittedData,
    authState,
    authServerError,
    shakeState,
    resetAuth,
  } = useAuthStatus();

  const onSignUpFormSubmit = async (data: SignUpFormValuesType) => {
    if (!isLoaded) return;
    startSubmission();
    try {
      await signUp.create({
        emailAddress: data.email,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setSubmittedData(data);
      setStage(AuthStage.Verifying);
      console.log(authStage);
      markSuccess();
      // You might want to update your UI state here to show a verification form
    } catch (error) {
      const clerkErrors = getClerkError(error);
      if (clerkErrors) {
        handleError(clerkErrors);
      }
    }
  };

  //

  const onOTPFormSubmit = async (OTPCodeData: OTPCodeFormValuesType) => {
    if (!isLoaded || !signUp) return;
    console.log("submission starts");
    startSubmission();
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: OTPCodeData.OTPCode,
      });
      if (completeSignUp.status === "complete") {
        setStage(AuthStage.Completed);
        markSuccess();
        await setActive({
          session: signUp.createdSessionId,
        });
        router.push("/dashboard");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2)); // pulls up error and next step is; fix this so flow can continue.
      }
    } catch (error) {
      const clerkErrors = getClerkError(error); // Returns err.errors | (property) ClerkAPIResponseError.errors: ClerkAPIError[]
      if (clerkErrors) {
        handleError(clerkErrors); // Turns auth state AuthState.Error, gets the errors on the error state to reflect on the UI.
      }
    }
  };

  const signUpFormMethods = useForm<SignUpFormValuesType>({
    resolver: zodResolver(signUpSchema),
  });
  const signUpOTPMethods = useForm<OTPCodeFormValuesType>({
    resolver: zodResolver(otpCodeSchema),
  });

  const values: AuthContextValue = {
    authState,
    authServerError,
    shakeState,
    authStage,
    onSignUpFormSubmit,
    onOTPFormSubmit,
    signUpFormMethods,
    signUpOTPMethods,
    submittedData,
    isLoaded,
    signUp,
    setActive,
  };
  return (
    <AuthContext.Provider value={values}>
      <FormProvider {...signUpFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }
  return context;
};

export default { useAuthContext, AuthProvider };
