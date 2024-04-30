import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "./ui/button";
const { userId } = auth();
const NavBar = () => {
  return (
    <div className="flex flex-row px-12 py-4 items-center gap-3">
      NavBar
      <div>
        {userId ? (
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        ) : (
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default NavBar;
