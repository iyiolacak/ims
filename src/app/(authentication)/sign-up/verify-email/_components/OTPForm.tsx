"use client";
import React, { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  OTPCodeSchema,
  TOTPCode,
  useSignUpContext,
} from "@/context/SignUpContext";

const OTPForm = () => {
  const { onOTPSubmit } = useSignUpContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TOTPCode>({
    resolver: zodResolver(OTPCodeSchema),
  });

  const OTPInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    OTPInputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit(onOTPSubmit)}>
      <div className="flex items-center justify-center">
        <Controller
          name="OTPCode"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputOTP
              maxLength={6}
              value={value}
              onChange={onChange}
              onComplete={(data) => console.log(data)}
              ref={OTPInputRef}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
      </div>
      {errors.OTPCode && (
        <p className="text-red-500">{errors.OTPCode.message}</p>
      )}
    </form>
  );
};

export default OTPForm;
