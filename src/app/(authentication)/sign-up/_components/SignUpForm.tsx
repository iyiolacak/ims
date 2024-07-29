"use client";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { handleClerkError } from "../../clerkErrorHandler";
import AnimatedInput from "./AnimatedInput";
import { ClerkAPIError, SignUpResource } from "@clerk/types";
import { useRouter } from 'next/navigation';
import { CircularLoading } from "respinner";
import { useSignUpFormContext } from "@/context/SignUpFormContext";
import { AlertCircleIcon } from "lucide-react";

interface SignUpFormProps {
  signUp: SignUpResource | undefined;
  isLoaded: boolean;
}

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type TSignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm: React.FC<SignUpFormProps> = ({ signUp, isLoaded }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const { setSubmittedFormData } = useSignUpFormContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<ClerkAPIError[] | null>(null);
  const onSubmit = async (data: TSignUpFormValues) => {
    if (!isLoaded || !signUp) {
      return;
    }
    setLoading(true);
    console.log(data);
    try {
      // await signUp.create({
      //   emailAddress: data.email,
      // });
      // Send email verification code
 
      // Change this to the desired path where email verification will be handled
      router.push("/sign-up/verify-email");
      setSubmittedFormData(data)
    } catch (err) {
      const errorMessage = handleClerkError(err);
      setServerError(errorMessage);
    }
  };

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
              disabled={loading}
              error={errors.email?.message}
              suppressHydrationWarning
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
              <Button type="submit" disabled={loading} className="w-full bg-primary" size={"lg"}>
                {!loading ? "Continue with email" : <CircularLoading size={25} duration={1} stroke="#FFF"/>
                }
              </Button>
              {serverError && (
          <div className="mt-1.5 flex flex-row items-center" role="alert">
            <AlertCircleIcon className="mr-1 text-red-600" size={18} />
            <p className="text-xs font-medium text-red-600">{JSON.stringify(serverError)}</p>
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
