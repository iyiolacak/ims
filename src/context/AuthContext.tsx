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

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type EmailForm = z.infer<typeof emailFormSchema>;

export type OTPCodeForm = z.infer<typeof otpCodeSchema>;

export interface AuthContextValue {
  authStage: AuthStage;
  onSignUpFormSubmit: (data: EmailForm) => Promise<void>;
  onOTPFormSubmit: (data: OTPCodeForm) => Promise<void>;
  emailFormMethods: UseFormReturn<EmailForm>;
  OTPFormMethods: UseFormReturn<OTPCodeForm>;
  submittedData: AuthFormValuesType | undefined;
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  shakeState: Record<string, boolean>;
}

/**
 * Represents the authentication action.
 * 
 * @type {"sign-in" | "sign-up" | "forgot-password"}
 */
export type AuthAction = 'sign-up' | 'sign-in' | 'forgot-password'
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
    resetSubmittingState,
  } = useAuthStatus();

  const onSignUpFormSubmit = async (data: EmailForm) => {
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

  const SUBMISSION_TIMEOUT = 30000; // 30 seconds

  const onOTPFormSubmit = async (OTPCodeData: OTPCodeForm) => {
    if (!isLoaded || !signUp) return;
    console.log("submission starts");
    startSubmission();

    let timeoutId = setTimeout(() => {
      // Reset submission state after timeout
      resetSubmittingState();
      handleError([
        {
          code: "submission_timeout",
          message: "Submission timed out. Please try again.",
        },
      ]);
    }, SUBMISSION_TIMEOUT);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: OTPCodeData.OTPCode,
      });

      clearTimeout(timeoutId); // Clear the timeout if the submission completes

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
      clearTimeout(timeoutId); // Clear the timeout if an error occurs
      if (clerkErrors) {
        handleError(clerkErrors); // Turns auth state AuthState.Error, gets the errors on the error state to reflect on the UI.
      }
    }
  };

  const emailFormMethods = useForm<EmailForm>({
    resolver: zodResolver(emailFormSchema),
  });
  const OTPFormMethods = useForm<OTPCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  });

  const values: AuthContextValue = {
    authState,
    authServerError,
    shakeState,
    authStage,
    onSignUpFormSubmit,
    onOTPFormSubmit,
    emailFormMethods,
    OTPFormMethods,
    submittedData,
  };
  return (
    <AuthContext.Provider value={values}>
      <FormProvider {...emailFormMethods}>{children}</FormProvider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export default { useAuthContext, AuthProvider };
