"use client";

import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy, SignUpResource } from "@clerk/types";
import React from "react";
import { useState } from "react";
import { oauthMapping } from "./oauthMapping";
type OAuthButtonProps = {
  strategy: OAuthStrategy; 
  className?: string;
  signUp: SignUpResource | undefined;
  isLoaded: boolean;
  disabled?: boolean;
};

const OAuthSignInButton: React.FC<OAuthButtonProps> = ({ isLoaded, signUp, className, strategy, disabled }) => {
  const mapping = oauthMapping[strategy];
  const signInWith = (strategy: OAuthStrategy) => {
    if (signUp) {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/",
      });
    }
  };

  return (
    <Button
      variant="secondary"
      className={`${className}`}
      size={"lg"}
      onClick={() => signInWith(strategy)}
      disabled={disabled}
    >
      {/* {mapping?.name || "Sign In"} */}
      Continue with {mapping?.name}
    </Button>
  );
};

export default OAuthSignInButton;
