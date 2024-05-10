"use client";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import UserMenuButton from "./ui/UserMenuButton";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/notifications", label: <Bell/>}
];
const utilityLinks = [
  { path: "/notifications", label: <Bell/>}
];
const NavBar = () => {
  const { user, isSignedIn, isLoaded } = useUser(); // This hook handles user state on the client side
  console.warn(" YUKLENDI MI YUKLENMEDI MI:", isLoaded, isSignedIn);

  return (
    <div className="w-full flex flex-row px-12 p-3 items-center gap-3 justify-between">
      <div className="flex flex-row items-center gap-x-8">
        <Link href={"/"}>
          <Image src={"logo-dark.svg"} alt="logo" width={40} height={40} />
        </Link>
        <div className="flex gap-4">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} passHref>
              <Button variant={"invisible"}>{link.label}</Button>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {!isLoaded ? (
          <Skeleton className="size-10 rounded-full" />
        ) : isSignedIn ? (
          <UserMenuButton />
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
