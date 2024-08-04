"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";

type UserId = Id<"users"> | null;

const UserContext = createContext<UserId>(null);

export function useUserId() {
  return useContext(UserContext);
}


export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<UserId>(null);


  const user = useQuery(api.users.current);

  useEffect(() => {
    if (user && typeof user._id === "string") {
      console.log("Fetched user ID:", user._id); // Log fetched user ID
      setUserId(user._id);
    } else {
      console.log("User is not loaded");
    }
  }, [user]);

  return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
}
