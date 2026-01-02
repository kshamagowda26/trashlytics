import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-primary/30",
        wet: "border-transparent bg-waste-wet text-white",
        dry: "border-transparent bg-waste-dry text-foreground",
        ewaste: "border-transparent bg-waste-ewaste text-white",
        hazardous: "border-transparent bg-waste-hazardous text-white",
        gold: "border-transparent bg-reward-gold text-foreground",
        silver: "border-transparent bg-reward-silver text-foreground",
        bronze: "border-transparent bg-reward-bronze text-white",
        eco: "border-transparent eco-gradient text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
