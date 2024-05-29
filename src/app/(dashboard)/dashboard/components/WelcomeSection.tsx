"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import React from "react";
interface WelcomeSectionProps {
  title?: string;
  description?: string;
}
const WelcomeSection = ({ title, description }: WelcomeSectionProps) => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="min-h-[100px]">
      {isSignedIn ? (
        !title && !description ? (
          <div>
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
              Welcome back, {user?.firstName}.
            </h1>
            <p className="leading-7 mt-2 text-slate-400">
              Dashboard, all general info appears in this field.
            </p>
          </div>
        ) : (
        <div>
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            {title}
          </h1>
          {description && <p className="leading-7 mt-2 text-slate-400">{description} </p>}
        </div>
        )
      ) : (
          <div>
            <Skeleton className="py-3.5 w-96 mb-2" />
            <Skeleton className="py-3 w-1/3" />
          </div>
      )}
    </div>
  );
};

export default WelcomeSection;
