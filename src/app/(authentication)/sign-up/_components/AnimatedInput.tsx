"use client";
import { Input } from "@/components/ui/input";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { AlertCircleIcon } from "lucide-react";

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prompt: string;
  placeholder: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: boolean;
  error?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  (
    { prompt, placeholder, id, value, onChange, password, error, ...props },
    ref,
  ) => {
    return (
      <div>
        <div className="relative">
          <Input
            id={id}
            onChange={onChange}
            value={value}
            ref={ref}
            {...props}
            className={cn(`pt-5 ${props.className}`, {
              "border-red-600 focus-visible:ring-red-600": error,
            })}
            placeholder={placeholder}
          />
          <label
            htmlFor={id}
            className={cn(
              "absolute left-3 px-1 transition-all duration-200 ease-in-out hover:cursor-text",
              "floating-label",
              {
                "text-red-600":error
              }
            )}
          >
            {prompt}
          </label>
        </div>
        {error && (
          <div className="flex flex-row items-center mt-1.5">
            <AlertCircleIcon className=" text-red-600 mr-1" size={18}/>
            <p className="text-xs font-medium text-red-600">{error}</p>
          </div>
        )}
      </div>
    );
  },
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
