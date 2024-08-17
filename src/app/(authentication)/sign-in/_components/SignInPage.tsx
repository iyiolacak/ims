import Logo from "@/app/(dashboard)/dashboard/components/Logo";
import React from "react";
import SectionHeader from "../../sign-up/_components/SectionHeader";
import OAuthSignInButton from "../../sign-up/_components/OAuthSignInButton";
import Divider from "../../sign-up/_components/Divider";
import LegalTOSText from "../../sign-up/_components/LegalTOSText";
import { ArrowUpRight } from "lucide-react";

function RedirectToCreateAccount() {
  return (
    <div>
      <p className="flex flex-row">
        Don&apos;t have an account yet?&nbsp;
        <span className="text-blue-700 flex flex-row">
          Create an account <ArrowUpRight size={16} />
        </span>
      </p>
    </div>
  );
}

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center px-4 py-3">
      <Logo size={48} className="flex items-center py-7" />
      <SectionHeader
        title="
        Continue where you left off.
        "
        headerSize={36}
        subtitle={
          <>
            Sign in to keep things running smoothly.&nbsp;
            <span className="pt-2 text-neutral-500">
              Your inventory, your way—secure and simple.
            </span>
          </>
        }
      />
      <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-3">
        <OAuthSignInButton
          strategy="oauth_google"
          className="border bg-white font-semibold"
          //   disabled={authState === AuthState.Submitting}
        />
      </div>
      {/* (component) 'Or' divider */}
      <Divider />
      {/* <SignUpForm /> */}
      <RedirectToCreateAccount /> <LegalTOSText />
    </div>
  );
};

export default SignInPage;
