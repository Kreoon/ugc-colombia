import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-semibold tracking-wide",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-brand-yellow text-black",
          "hover:bg-brand-gold hover:shadow-[0_0_20px_rgba(212,160,23,0.5)]",
          "active:scale-[0.98]",
        ],
        outline: [
          "border border-brand-gold text-brand-gold bg-transparent",
          "hover:bg-brand-gold/10 hover:shadow-[0_0_16px_rgba(212,160,23,0.3)]",
          "active:scale-[0.98]",
        ],
        ghost: [
          "text-brand-gray bg-transparent",
          "hover:text-white hover:bg-white/5",
        ],
        destructive: [
          "bg-red-600 text-white",
          "hover:bg-red-700",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        default: "h-11 px-6 text-sm rounded-lg",
        lg: "h-14 px-8 text-base rounded-xl",
        xl: "h-16 px-10 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
