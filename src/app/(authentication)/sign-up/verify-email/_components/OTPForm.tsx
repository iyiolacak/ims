"use client";
import React, { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OTPInputProps } from "input-otp";

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
  const firstInputRef = useRef(null);
  const onSubmit = (OTPCode: TOTPCode) => {
    console.log("one time password:", OTPCode);
  };
  const OTPInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    OTPInputRef.current?.focus()
  }, [])
  return (
    <div className="flex items-center justify-center">
      <InputOTP maxLength={6}
      ref={OTPInputRef}>
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
