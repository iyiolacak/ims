import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Types
type Variants = {
  [variantKey: string]: {
    [variantValue: string]: string;
  };
};

type DefaultVariants<V extends Variants> = {
  [K in keyof V]: keyof V[K];
};

interface Config<V extends Variants> {
  base: string;
  variants: V;
  defaultVariants: DefaultVariants<V>;
}

// Example config
const config: Config<{
  size: {
    sm: string;
    md: string;
    lg: string;
  };
  color: {
    primary: string;
    secondary: string;
  };
}> = {
  base: "font-bold",
  variants: {
    size: {
      sm: "w-12 h-10",
      md: "w-14 h-10",
      lg: "w-16 h-10",
    },
    color: {
      primary: "bg-blue-700",
      secondary: "bg-black",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "primary",
  },
};

// Utility functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createVariants<V extends Variants>(config: Config<V>) {
  return function (props: { [variantKey in keyof V]?: keyof V[variantKey] } = {}) {
    const { base, variants, defaultVariants } = config;

    const variantClasses = Object.keys(variants || {}).map((variantKey) => {
      const propValue = props[variantKey as keyof V] || defaultVariants[variantKey as keyof V];
      return variants[variantKey as keyof V][propValue as keyof V[keyof V]];
    });

    return combineClasses(base, ...variantClasses);
  };
}

function combineClasses(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

// Create the variant function
const buttonVariant = createVariants(config);

// Example usage
const classNames = buttonVariant({ size: "md", color: "secondary" });
console.log(classNames); // Output: "font-bold w-14 h-10 bg-black"

