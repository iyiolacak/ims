import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "@clerk/clerk-react";

const UserProfileImage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  return (
    <Avatar className="size-10 rounded-xl">
      {user?.imageUrl ? (
        <AvatarImage src={user.imageUrl} alt="User's profile image" />
      ) : (
        <Skeleton className="size-10 rounded-xl" />
      )}
    </Avatar>
  );
};

export default UserProfileImage;
