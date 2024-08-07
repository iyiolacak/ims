"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn, Config, createVariants } from "@/lib/utils";

type HoverCardVariants = {
  variant: {
    default: string;
    shortcut: string;
    white: string;
  };
};

const hoverCardConfig: Config<HoverCardVariants> = {
  base: "z-50 w-content rounded-lg border text-white shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  variants: {
    variant: {
      default: "border-neutral-600 p-4 bg-neutral-900 rounded-xl",
      shortcut: "px-1 py-0.5 rounded-lg",
      white: "bg-popover border border-slate-200 text-popover-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
};

const hoverCardVariant = createVariants(hoverCardConfig);

interface HoverCardContentProps extends React.ComponentPropsWithRef<typeof HoverCardPrimitive.Content> {
  variant?: keyof HoverCardVariants["variant"];
}

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = "center", variant = "default", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      hoverCardVariant({ variant }),
      className
    )}
    {...props}
  />
));

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
