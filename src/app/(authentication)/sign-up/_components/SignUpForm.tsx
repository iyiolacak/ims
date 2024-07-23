"use client";
import React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { handleClerkError } from "../../clerkErrorHandler";
import AnimatedInput from "./AnimatedInput";
import { SignUpResource } from "@clerk/types";

interface SignUpFormProps {
  signUp: SignUpResource | undefined;
  isLoaded: boolean;
}

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type TSignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm: React.FC<SignUpFormProps> = ({ signUp, isLoaded }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpFormValues) => {
    if (!isLoaded || !signUp) {
      return;
    }
    console.log(data);
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Change this to the desired path where email verification will be handled
      // router.push("/verify-email");
    } catch (err) {
      handleClerkError(err);
    }
  };

  return (
    <>
      <div className="flex min-h-full min-w-full flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <AnimatedInput
              id="email"
              type="text"
              prompt="Enter your email"
              {...register("email")}
              placeholder="example@example.com"
              error={errors.email?.message}
              suppressHydrationWarning
            />
            <AnimatedInput
              id="password"
              type="password"
              prompt="Create a password"
              {...register("password")}
              placeholder=""
              error={errors.password?.message}
              suppressHydrationWarning
            />
            <div>
              <Button type="submit" className="w-full bg-primary" size={"lg"}>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
