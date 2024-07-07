"use client";
import React from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { Skeleton } from "./skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { Input } from "./input";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

interface IUserMenuButton {
  isOpen: boolean;
}

const UserMenuButton: React.FC<IUserMenuButton> = ({ isOpen }) => {
  const { openUserProfile } = useClerk();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();
  const bezierCurve = [0.42, 0, 0.58, 1.0]; // Apple-like easing

  // Show a skeleton if user data isn't loaded yet
  if (!isLoaded) {
    return isOpen ? (
      <div className="h-[60px] w-full">
        <div className="flex h-full w-full flex-col rounded-xl border bg-white px-2">
          <div className="flex h-full items-center space-x-2">
            <Skeleton className="h-10 w-10 rounded-xl bg-slate-200" />
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-4 w-24 rounded bg-slate-200" />
              <Skeleton className="h-3 w-32 rounded bg-slate-200" />
            </div>
          </div>
          {/* search box */}
          {/* <Separator className="my-3" orientation="horizontal" />
          <Skeleton className="w-full h-12 rounded-lg" /> */}
        </div>
      </div>
    ) : (
      <Skeleton className="h-10 w-10 rounded-xl" />
    );
  }

  // If the user is not signed in, perhaps redirect or show nothing
  if (!isSignedIn) {
    return null; // or redirect, or a sign-in prompt
  }

  const handleProfileClick = () => {
    openUserProfile(); // This opens the Clerk user profile modal
  };

  return (
    <div>
      {isOpen ? (
        <div className="h-[60px] w-full">
          <div className="flex h-full items-center rounded-xl border bg-white px-1">
            <div className="flex flex-col items-center">
              <button
                className="flex items-center space-x-2 px-2"
                onClick={handleProfileClick}
              >
                <Avatar className="size-10 rounded-xl">
                  {user.imageUrl ? (
                    <AvatarImage
                      src={user.imageUrl}
                      alt="User's profile image"
                    />
                  ) : (
                    <Skeleton className="size-10 rounded-xl" />
                  )}
                </Avatar>
                <div className="flex flex-col overflow-hidden text-start">
                  <p className="text-md font-medium text-black">
                    {user?.firstName}
                  </p>
                  <p className="mt-[-3px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-400">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <div className="size-12 h-full rounded-xl bg-red-600"></div>
              </button>
            </div>
            {/* Search box */}
            {/* <Separator className="" orientation="horizontal" />
              <Input
              className="w-full bg-slate-50 border-0 px-2 mt-2 h-12 placeholder:text-foreground-muted/50"
              placeholder="Search in sidebar..."
              /> */}
          </div>
        </div>
      ) : (
        // Sidebar !isOpen state
        <div className="flex w-full justify-start">
          <HoverCard>
            <HoverCardTrigger>
              <button
                className="flex items-center"
                onClick={handleProfileClick}
              >
                <Avatar className="size-10 rounded-xl">
                  {user.imageUrl ? (
                    <AvatarImage
                      src={user.imageUrl}
                      alt="User's profile image"
                    />
                  ) : (
                    <Skeleton className="size-full" />
                  )}
                </Avatar>
              </button>
            </HoverCardTrigger>
            {/* Hover Card Content */}
            <HoverCardContent
            variant="Shortcut"
            side="right"
            className="w-auto">
              <div className="flex flex-row justify-start">
                {/* Avatar div */}
                <div>
                  <Avatar className="size-10 rounded-xl">
                    {user.imageUrl ? (
                      <AvatarImage
                        src={user.imageUrl}
                        alt="User's profile image"
                      />
                    ) : (
                      <Skeleton className="size-full" />
                    )}
                  </Avatar>
                </div>
                {/* Full name account information div */}
                <div className="ml-2">
                  <p className="text-md font-normal">{user.fullName}</p>
                  <p className="text-sm">
                    {user.primaryPhoneNumber
                      ? user.primaryPhoneNumber?.phoneNumber
                      : user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </div>
  );
};

export default UserMenuButton;
