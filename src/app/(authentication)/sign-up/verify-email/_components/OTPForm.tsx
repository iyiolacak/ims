"use client";
import React, { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  otpCodeSchema,
  OTPCodeType,
  useSignUpContext,
} from "@/context/BaseAuthContext";
import ErrorDisplay from "@/app/(dashboard)/dashboard/components/ErrorDisplay";
import { AuthState } from "@/hooks/useAuthStatus";

// 
// TODO: The OTP input validation schema will be handled better. 
// 

const OTPForm = () => {
  const { onOTPSubmit, authState, authServerError, shake } = useSignUpContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OTPCodeType>({
    resolver: zodResolver(otpCodeSchema),
  });

  const OTPInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    OTPInputRef.current?.focus();
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  // Handler function to trigger form submission programmatically
  const handleOTPComplete = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit(onOTPSubmit)}>
      <div className={`flex items-center justify-center ${shake ? "bzzt" : ""}`}>
        <Controller
          name="OTPCode"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputOTP
              maxLength={6}
              value={value}
              onChange={onChange}
              // onComplete={handleOTPComplete}
              ref={OTPInputRef}
              disabled={authState === AuthState.Submitting}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className={shake ? "bzzt" : ""} />
                <InputOTPSlot index={1} className={shake ? "bzzt" : ""}/>
                <InputOTPSlot index={2} className={shake ? "bzzt" : ""}/>
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className={shake ? "bzzt" : ""}/>
                <InputOTPSlot index={4} className={shake ? "bzzt" : ""}/>
                <InputOTPSlot index={5} className={shake ? "bzzt" : ""}/>
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>
      {errors.OTPCode && (
        <p className="text-red-500">{errors.OTPCode.message}</p>
      )}
      <ErrorDisplay alertIcon={false} className="flex justify-center" errors={authServerError} />
    </form>
  );
};

export default OTPForm;
