"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primario: negro con texto crema
        default:
          "bg-brand-black text-brand-cream hover:bg-brand-text shadow-sm hover:shadow-md active:scale-[0.98]",
        // Dorado: CTA principal de conversión
        gold:
          "bg-brand-gold text-brand-black hover:bg-yellow-300 shadow-sm hover:shadow-md active:scale-[0.98] font-semibold",
        // Outline: borde negro
        outline:
          "border-2 border-brand-black bg-transparent text-brand-black hover:bg-brand-black hover:text-brand-cream",
        // Ghost: sin fondo
        ghost:
          "bg-transparent text-brand-black hover:bg-brand-black/5",
        // Destructivo
        destructive:
          "bg-brand-red text-white hover:bg-red-700 shadow-sm",
        // Link
        link:
          "text-brand-black underline-offset-4 hover:underline p-0 h-auto",
        // Outline crema (para fondos oscuros)
        "outline-cream":
          "border-2 border-brand-cream bg-transparent text-brand-cream hover:bg-brand-cream hover:text-brand-black",
      },
      size: {
        sm: "h-9 rounded-md px-4 text-sm",
        default: "h-11 rounded-lg px-6 text-base",
        lg: "h-13 rounded-lg px-8 text-lg",
        xl: "h-15 rounded-xl px-10 text-xl",
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
