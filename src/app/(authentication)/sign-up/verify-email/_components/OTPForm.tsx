"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OTPCodeSchema = z.object({
  OTPCode: z.string().min(6),
});

type TOTPCode = z.infer<typeof OTPCodeSchema>;

const OTPForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOTPCode>({
    resolver: zodResolver(OTPCodeSchema),
  });
  const onSubmit = (OTPCode: TOTPCode) => {
    console.log("one time password:", OTPCode);
  };
  return (
    <div className="w-full items-center justify-center">
      there you will face the real OTP code.
      <InputOTP maxLength={6}>
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
    </div>
  );
};

export default OTPForm;
