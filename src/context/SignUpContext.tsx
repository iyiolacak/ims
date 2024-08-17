import React, { createContext } from "react";
import { z } from "zod";

// Validation schema as z object - are sent to OTPForm component.
export const otpCodeSchema = z.object({
  OTPCode: z.string().min(6),
});

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type SignUpFormValuesType = z.infer<typeof signUpSchema>;

export type OTPCodeType = z.infer<typeof otpCodeSchema>;

interface SignUpContextValue {
  onSignUpSubmit: (data: SignUpFormValuesType) => Promise<void>;
  onOTPSubmit: (data: OTPCodeType) => Promise<void>;
}

const SignUpContext = createContext<SignUpContextValue | undefined>(undefined);

const SignUpProvider = () => {
  return <div>SignUpContext</div>;
};

export default SignUpContext;
