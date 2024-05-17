import React from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { Skeleton } from "./skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { Input } from "./input";
import { Search } from "lucide-react";

const UserMenuButton = () => {
  const { openUserProfile } = useClerk();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();

  // Show a skeleton if user data isn't loaded yet
  if (!isLoaded) {
    return (
      <div className="h-[160px]">
        <div className="h-[155px] flex flex-col w-full px-2 py-3 bg-white border rounded-xl shadow-sm">
          <div className="flex items-center space-x-2 mt-3 mb-1">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="flex flex-col space-y-1">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-32 h-3 rounded" />
            </div>
          </div>
          <Separator className="my-3" orientation="horizontal" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    );
  }

  // If the user is not signed in, perhaps redirect or show nothing
  if (!isSignedIn) {
    return null; // or redirect, or a sign-in prompt
  }

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
  };

  // Function to generate avatar initials
  const getAvatarFallback = () => {
    if (user && user.firstName) {
      return user.firstName.substring(0, 2).toUpperCase();
    }
    return "??"; // Fallback initials
  };

  const handleProfileClick = () => {
    openUserProfile(); // This opens the Clerk user profile modal
  };

  return (
    <div className="h-[160px]">
      <div className="flex w-full px-2 py-3 bg-white border rounded-xl shadow-sm">
        <div className="flex flex-col w-full">
          <button
            className="flex items-center space-x-2 p-2"
            onClick={handleProfileClick}
          >
            <Avatar className="size-10 rounded-xl">
              {user.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt="User's profile image" />
              ) : (
                <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col justify-start items-start ml-2 overflow-hidden">
              <p className="text-lg font-medium text-black">
                {user?.firstName}
              </p>
              <p className="text-slate-400 text-xs mt-[-3px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </button>
          <Separator className="my-3" orientation="horizontal" />
          <Input
            className="w-full bg-slate-50 border-0 px-2 h-12 placeholder:text-foreground-muted/50"
            placeholder="Search in sidebar..."
          />
        </div>
      </div>
    </div>
  );
};

export default UserMenuButton;
