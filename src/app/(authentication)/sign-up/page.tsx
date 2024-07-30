"use client";
import React from "react";
import SignUpForm from "./_components/SignUpForm";
import AnimatedInput from "./_components/AnimatedInput";
import OAuthSignInButton from "./_components/OAuthSignInButton";
import { Separator } from "@/components/ui/separator";
import LegalTOSText from "./_components/LegalTOSText";
import { useSignUp } from "@clerk/clerk-react";
import Logo from "@/app/(dashboard)/dashboard/components/Logo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SignUpStageIndicator from "./_components/SignUpStageIndicator";
import Divider from "./_components/Divider";
import SectionHeader from "./_components/SectionHeader";
import { useSignUpFormContext } from "@/context/SignUpFormContext";

const SignUp = () => {
  const { isLoaded, signUp } = useSignUp();
  const { isSubmitting } = useSignUpFormContext();
  return (
    <div className="flex h-full w-full flex-col items-center px-4 py-3">
      <Logo size={48} className="flex items-center py-7" />
      <SectionHeader
        title="Create your Einv account."
        subtitle={
          <>
            Sign up in seconds, it&apos;s fast and free.&nbsp;
            <span className="pt-2 text-neutral-500">
              No contract required. Hassle-free inventory management.
            </span>
          </>
        }
      />

      <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-3">
        {/* Must provide a signUp object from useSignUp which I just created a context for. */}
        <OAuthSignInButton
          strategy="oauth_google"
          className="border bg-white font-semibold"
          isLoaded={isLoaded}
          disabled={isSubmitting}
          
        />
      </div>
      {/* 'Or' divider */}
      <Divider />
      {/* Form: Email input and submit button */}

      {/* Must provide a signUp object from useSignUp which I just created a context for. */}
      <SignUpForm />
      <LegalTOSText />
    </div>
  );
};

export default SignUp;
