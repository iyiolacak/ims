"use client";
import React from "react";
import SignUpForm from "../_components/SignUpForm";
import AnimatedInput from "../_components/AnimatedInput";
import OAuthSignInButton from "../_components/OAuthSignInButton";
import LegalTOSText from "../_components/LegalTOSText";
import Logo from "@/app/(dashboard)/dashboard/components/Logo";
import Divider from "../_components/Divider";
import SectionHeader from "../_components/SectionHeader";
import { useAuthContext } from "@/context/AuthContext";
import { useAuthStatus, AuthState } from "@/hooks/useAuthStatus";

const SignUp = () => {
  const { authState } = useAuthStatus();
  return (
    <div className="flex w-full flex-col items-center px-4 py-3">
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
        <OAuthSignInButton
          strategy="oauth_google"
          className="border bg-white font-semibold"
          disabled={authState === AuthState.Submitting}
        />
      </div>
      <Divider />
      <SignUpForm />
      <LegalTOSText />
    </div>
  );
};

export default SignUp;
