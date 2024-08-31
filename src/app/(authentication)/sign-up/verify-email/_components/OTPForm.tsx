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
  OTPCodeFormValuesType,
  useAuthContext,
} from "@/context/AuthContext";
import ErrorDisplay from "@/app/(dashboard)/dashboard/components/ErrorDisplay";
import { AuthState, useAuthStatus, AuthStage } from "@/hooks/useAuthStatus";

//
// TODO: The OTP input validation schema will be handled better.
//

const OTPForm = () => {
  const { onOTPFormSubmit, authState, authServerError, shake } =
    useAuthContext();
    console.log(authState === AuthState.Success); // Check this before the return statement


  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OTPCodeFormValuesType>({
    resolver: zodResolver(otpCodeSchema),
  });

  const [showError, setShowError] = React.useState(false);

  const OTPInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    OTPInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (authState !== AuthState.Submitting) {
      OTPInputRef.current?.focus();
    }
  }, [authState]);
  const formRef = useRef<HTMLFormElement>(null);
  console.log(authState === AuthState.Success); // Check this before the return statement


  return (
    <form ref={formRef} onSubmit={handleSubmit(onOTPFormSubmit)}>
      <div
        className={`flex items-center justify-center ${shake ? "bzzt" : ""}`}
      >
        <Controller
          name="OTPCode"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputOTP
              id="otp"
              maxLength={6}
              value={value}
              onChange={onChange}
              onComplete={handleSubmit(onOTPFormSubmit)}
              ref={OTPInputRef}
              // onSubmit={handleOTPComplete}
              disabled={authState === AuthState.Submitting}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  shake={!!authServerError} // Pass true to shake on server error
                  error={!!authServerError} // Pass true to show red border on server error
                />
                <InputOTPSlot
                  index={1}
                  shake={!!authServerError} // Pass true to shake on server error
                  error={!!authServerError} // Pass true to show red border on server error
                />
                <InputOTPSlot
                  index={2}
                  shake={!!authServerError} // Pass true to shake on server error
                  error={!!authServerError} // Pass true to show red border on server error
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  shake={!!authServerError} // Pass true to shake on server error
                  error={!!authServerError} // Pass true to show red border on server error
                />
                <InputOTPSlot
                  index={4}
                  shake={!!authServerError} // Pass true to shake on server error
                  error={!!authServerError} // Pass true to show red border on server error
                />
                <InputOTPSlot
                  index={5}
                  shake={!!authServerError} // Pass true to shake on server error
                  error={!!authServerError} // Pass true to show red border on server error
                />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>
      <div className="min-h-10">

      {(errors.OTPCode?.message || authServerError) && (
        <ErrorDisplay
        alertIcon={false}
        className="flex justify-center"
        errors={errors.OTPCode?.message || authServerError}
        />
      )}
      </div>
    </form>
  );
};

export default OTPForm;
