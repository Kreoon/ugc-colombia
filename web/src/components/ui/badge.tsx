import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-sans font-semibold tracking-wider uppercase text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30 rounded-full px-3 py-1",
        gold: "bg-brand-gold/15 text-brand-gold border border-brand-gold/30 rounded-full px-3 py-1",
        outline:
          "border border-brand-graphite text-brand-gray rounded-full px-3 py-1",
        solid: "bg-brand-yellow text-black rounded-full px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
