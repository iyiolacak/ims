import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AlertCircleIcon, CircleHelp } from "lucide-react";
import { ClerkAPIError } from "@clerk/types";

interface ErrorDisplayProps {
  errors: ClerkAPIError[] | undefined;
  className?: string;
  alertIcon?: boolean;
}
const ErrorDisplay = ({
  errors,
  className,
  alertIcon = true,
}: ErrorDisplayProps) => {
  if (!errors || errors.length === 0) return null;
  return (
    <>
      {/* Server Error container */}
      {errors?.map((error, index) => {
        return (
          <div
            className={`group flex flex-row items-center p-1 text-center ${className}`}
            role="alert"
            key={index}
          >
            {alertIcon ? (
              <AlertCircleIcon className="mr-1 text-red-600" size={18} />
            ) : null}
            <p className="flex items-center text-center text-xs font-medium text-red-600">
              {error.message}.
              {error.longMessage?.length ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <span className="flex cursor-default items-center space-x-1 rounded-md p-0.5 font-semibold transition-colors duration-500 ease-out hover:text-red-400 group-hover:bg-red-50">
                      &nbsp;More info <CircleHelp className="ml-1" size={18} />
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="">
                    <div className="max-w-md">{error.longMessage}</div>
                  </HoverCardContent>
                </HoverCard>
              ) : null}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default ErrorDisplay;
