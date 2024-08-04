"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AnimatedInput from "./AnimatedInput";
import { useRouter } from "next/navigation";
import { CircularLoading } from "respinner";
import { SubmissionStatus, useSignUpContext } from "@/context/SignUpContext";
import {
  AlertCircleIcon,
  Check,
  CircleX,
  Cross,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// To-do
// - Make custom flow succeed a sign up
// - Animation between route - first page will have end animation, second page will have start. DONE.

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const { onSubmit, submissionStatus, serverError } =
    useSignUpContext();

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // Focus on the email input field when the component mounts
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const { ref, ...rest } = register("email");

  return (
    <>
      <div className="min-w-full flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <AnimatedInput
              id="email"
              type="text"
              prompt="Enter your email"
              {...register("email")}
              placeholder="example@example.com"
              disabled={isSubmitting}
              error={errors.email?.message}
              suppressHydrationWarning
              ref={(e) => {
                ref(e);
                emailInputRef.current = e;
              }}
            />
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary transition-colors ${submissionStatus === SubmissionStatus.Error ? "pulse-once-red" : ""}`}
                size={"lg"}
              >
                {/* Change the first isSubmitting with isSuccess */}
                {submissionStatus === SubmissionStatus.Error ? (
                  "Continue with email"
                ) : submissionStatus === SubmissionStatus.Success ? (
                  <Check />
                ) : submissionStatus === SubmissionStatus.Submitting ? (
                  <CircularLoading size={25} duration={1} stroke="#FFF" />
                ) : (
                  "Continue with email"
                )}
              </Button>
              {/* Server Error container */}
              {serverError
                ? serverError.map((error, index) => {
                    error.message;
                    return (
                      <div
                        className="mt-1.5 flex flex-row items-center"
                        role="alert"
                        key={index}
                      >
                        <AlertCircleIcon
                          className="mr-1 text-red-600"
                          size={18}
                        />
                        <p className="text-center text-xs font-medium text-red-600">
                          {error.message}.
                          <HoverCard>
                            <HoverCardTrigger>
                              <span className="text-gray-500">
                                &nbsp;More info
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="border-neutral-200 bg-white text-neutral-900">
                              <div>{error.longMessage}</div>
                            </HoverCardContent>
                          </HoverCard>
                        </p>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
