"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

enum Variant {
  Default = "default",
  Shortcut = "shortcut",
  White = "white",
}


interface HoverCardContentProps extends React.ComponentPropsWithRef<typeof HoverCardPrimitive.Content> {
  variant?: Variant;
}

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const variantClasses: Record<Variant, string> = {
  [Variant.Default]: "",
  [Variant.Shortcut]: "px-1 py-0.5 bg-green-600",
  [Variant.White]: "bg-popover border border-slate-200 text-popover-foreground"
}
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = "center", variant = Variant.Default, sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-content rounded-lg border border-neutral-600 bg-neutral-900 p-4 text-white shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      variantClasses[variant],
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
