"use client";
import React from "react";
import SignUpForm from "./_components/SignUpForm";
import AnimatedInput from "./_components/AnimatedInput";
import OAuthSignInButton from "./_components/OAuthSignInButton";
import { Separator } from "@/components/ui/separator";
import { useSignUp } from "@clerk/clerk-react";

const SignUp = () => {
  const { isLoaded, signUp } = useSignUp();
  return (
    <div className="flex min-w-full flex-col p-4 md:p-3">
      <div className="md:mb-6">
        <h2 className="mt-5 scroll-m-20 text-2xl font-bold tracking-tight transition-colors first:mt-0 md:mt-10 md:pb-2 md:text-4xl">
          Create your Einv account
        </h2>
        <h3 className="mt-2 scroll-m-20 text-lg font-normal tracking-tight md:mt-8 md:text-xl">
          Sign up in seconds, it&apos;s fast and free.&nbsp;
          <span className="pt-2 text-neutral-500">
            No contract required. Hassle-free inventory management.
          </span>
        </h3>
      </div>
      <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-3">
        <OAuthSignInButton
          strategy="oauth_google"
          className="border bg-white font-semibold"
          signUp={signUp}
          isLoaded={isLoaded}
        />
      </div>
      {/* OR */}
      <div className="my-3 flex w-full items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-xs font-medium tracking-wide text-slate-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <SignUpForm signUp={signUp} isLoaded={isLoaded} />
      {/* SignUpForm is causing hydration error.  */}
    </div>
  );
};

export default SignUp;
