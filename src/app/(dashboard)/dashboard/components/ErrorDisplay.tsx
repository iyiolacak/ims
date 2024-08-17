import React from "react";
import { AlertCircleIcon } from "lucide-react";
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
      {errors?.map((error, index) => (
        <div
          key={index}
          className={`group flex flex-row items-start rounded-lg p-1 text-start ${className}`}
          role="alert"
        >
          {alertIcon && (
            <AlertCircleIcon
              className="mr-1 text-red-600 group-hover:text-red-500"
              size={18}
            />
          )}
          <p className="flex items-center text-start text-xs font-medium text-red-600">
            {error.longMessage ? error.longMessage : error.message}
          </p>
        </div>
      ))}
    </>
  );
};

export default ErrorDisplay;
