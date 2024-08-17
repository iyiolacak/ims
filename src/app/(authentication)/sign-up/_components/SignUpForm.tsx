"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AnimatedInput from "./AnimatedInput";
import { useRouter } from "next/navigation";
import { CircularLoading } from "respinner";
import {
  SignUpContextValue,
  SignUpFormValuesType,
  useSignUpContext,
} from "@/context/BaseAuthContext";
import {
  AlertCircleIcon,
  Check,
  CircleX,
  Cross,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthState } from "@/hooks/useAuthStatus";
import ErrorDisplay from "@/app/(dashboard)/dashboard/components/ErrorDisplay";
import LoadingCircle from "./LoadingCircle";

// To-do
// - Make custom flow succeed a sign up
// - Animation between route - first page will have end animation, second page will have start. DONE.

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors },
  } = useFormContext<SignUpFormValuesType>();

  const {
    onSignUpFormSubmit,
    authState,
    authServerError,
    shake,
  }: SignUpContextValue = useSignUpContext();

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // Focus on the email input field when the component mounts
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div className="min-w-full flex-col">
      <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
        <div className="flex flex-col gap-y-4">
          <AnimatedInput
            className={`${shake ? "bzzt" : ""}`}
            id="email"
            type="text"
            prompt="Enter your email"
            {...register("email")}
            placeholder="example@example.com"
            disabled={isSubmitting}
            error={errors.email?.message}
          />
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn("w-full bg-primary transition-all", {
                "bzzt ": shake === true,
                "pulse-once-red": authState === AuthState.Error,
              })}
              size={"lg"}
            >
              {/* Change the first isSubmitting with isSuccess */}
              {authState === AuthState.Error ? (
                "Continue with email"
              ) : authState === AuthState.Success ? (
                <Check />
              ) : authState === AuthState.Submitting ? (
                <LoadingCircle />
              ) : (
                "Continue with email"
              )}
            </Button>

            <ErrorDisplay className={"mt-2"} errors={authServerError} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
