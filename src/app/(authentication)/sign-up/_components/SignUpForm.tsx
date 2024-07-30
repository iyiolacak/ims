"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { handleClerkError } from "../../clerkErrorHandler";
import AnimatedInput from "./AnimatedInput";
import { ClerkAPIError, SignUpResource } from "@clerk/types";
import { useRouter } from "next/navigation";
import { CircularLoading } from "respinner";
import { useSignUpFormContext } from "@/context/SignUpFormContext";
import { useSignUpContext } from "@/context/SignUpContext";
import { AlertCircleIcon } from "lucide-react";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type TSignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  // Warning: It is not form values context!
  const { isLoaded, signUp, setActive } = useSignUpContext();
  const { setSubmittedFormData, setIsSubmitting, isSubmitting } =
    useSignUpFormContext();

  const router = useRouter();

  const [serverError, setServerError] = useState<ClerkAPIError[] | null>(null);

  // Handle submit
  const onSubmit = async (data: TSignUpFormValues) => {
    if (!isLoaded || !signUp) {
      return;
    }
    // Activate loading state of the page.
    setIsSubmitting(true);
    try {
      // await signUp.create({
        //   emailAddress: data.email,
        // });
        // Send email verification code - Prepare OTP.

      // Change this to the desired path where email verification will be handled.
      router.push("/sign-up/verify-email");

      // Set the submitted form data state for reflecting the data on UI, in the next pages.
      setSubmittedFormData(data);
    } catch (err) {
      const errorMessage = handleClerkError(err);
      // serverError state will be reflected on the UI, below the submit button.
      setServerError(errorMessage);
    }
  };

  // Email input ref.
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // Focus emailInputRef.
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const { ref, ...rest } = register('email');

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
            {/* Password input */}
            {/* <AnimatedInput
              id="password"
              type="password"
              prompt="Create a password"
              {...register("password")}
              placeholder=""
              error={errors.password?.message}
              suppressHydrationWarning
            /> */}
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary"
                size={"lg"}
              >
                {!isSubmitting ? (
                  "Continue with email"
                ) : (
                  <CircularLoading size={25} duration={1} stroke="#FFF" />
                )}
              </Button>
              {serverError && (
                <div className="mt-1.5 flex flex-row items-center" role="alert">
                  <AlertCircleIcon className="mr-1 text-red-600" size={18} />
                  <p className="text-xs font-medium text-red-600">
                    {JSON.stringify(serverError)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
