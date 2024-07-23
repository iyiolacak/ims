import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { UserProfileProps, UserResource } from "@clerk/types";
import { useClerk } from "@clerk/clerk-react";

interface IUserMenuButton {
  user: UserResource | null | undefined;
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  e: React.MouseEvent<HTMLButtonElement>;
  handleProfileClick: (props?: UserProfileProps) => void;
}

const ExpandedUserMenuButton: React.FC<IUserMenuButton> = ({
  user,
  isLoaded,
  isSignedIn,
  handleProfileClick,
}) => {
  console.log(user);
  return (
    <div className="h-[60px] w-full">
      <div className="flex h-full items-center rounded-xl border bg-white px-1">
        <div className="flex flex-col items-center">
          <button
            className="flex items-center space-x-2 px-2"
            onClick={(e) => handleProfileClick}
          >
            <Avatar className="size-10 rounded-xl">
              {user?.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt="User's profile image" />
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
      </div>
    </div>
  );
};

export default ExpandedUserMenuButton;
