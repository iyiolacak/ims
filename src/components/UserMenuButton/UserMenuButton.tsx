"use client";
import React from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import UserMenuButtonSkeleton from "./UserMenuButtonSkeleton";
import ExpandedUserMenuButton from "./ExpandedUserMenuButton";

interface IUserMenuButton {
  isOpen: boolean;
}

const UserMenuButton: React.FC<IUserMenuButton> = ({ isOpen }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isHovered, setIsHovered] = React.useState(false);
  const bezierCurve = [0, 0.33, 0.28, 1]; // Apple-like easing
  const { openUserProfile } = useClerk();
  const handleProfileClick = () => {
      openUserProfile(); // This opens the Clerk user profile modal
  };

  // Show a skeleton if user data isn't loaded yet
  if (!isLoaded) {
    return isOpen ? (
      <UserMenuButtonSkeleton />
    ) : (
      <Skeleton className="h-10 w-10 rounded-xl" />
    );
  }
  // If the user is not signed in, perhaps redirect or show nothing
  if (!isSignedIn) {
    return null; // or redirect,  or a sign-in prompt
  }

  return (
    <div>
      {isOpen ? (
        <ExpandedUserMenuButton user={user} isSignedIn={isSignedIn} isLoaded={isLoaded} onClick={(e: ClickEvent) => handleProfileClick}/>
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
            <HoverCardContent variant="default" side="right" className="w-auto">
              <div
                className="group flex flex-row justify-start hover:cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
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
                  <p className="text-md flex w-full flex-row items-center justify-between font-semibold">
                    <span className="w-content">{user.fullName}</span>
                    <motion.span
                      initial={{ opacity: 0, x: -20, filter: "blur(2px)" }}
                      animate={
                        isHovered
                          ? { opacity: 1, x: 0, filter: "blur(0px)" }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.3, ease: bezierCurve }}
                      exit={{ opacity: 0, x: -20, filter: "blur(2px)" }}
                      className="ml-0.5"
                    >
                      <ArrowRight size={16} className="" />
                    </motion.span>
                  </p>
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
