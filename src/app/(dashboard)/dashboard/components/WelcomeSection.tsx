"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import React from "react";

const WelcomeSection = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="min-h-[100px]">
      {isSignedIn ? (
        <div>
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            Welcome back, {user?.firstName}
          </h1>
          <p className="leading-7 w-1/2 mt-2">
            Gain real-time visibility into your stock levels, optimize ordering
            processes, and minimize the risk of stockouts or overstocking
          </p>
        </div>
      ) : (
        <div>
          <Skeleton className="py-3.5 w-96 mb-2" />
          <Skeleton className="py-3 w-1/3" />
          <Skeleton className="py-3 w-1/3 mt-2"/>
        </div>
      )}
    </div>
  );
};

export default WelcomeSection;
