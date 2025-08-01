"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, ElementType } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "mx-auto inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-base shadow-xs text-fg-100 font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-bg-200 hover:bg-bg-400",
        accent: "bg-accent-600 hover:bg-accent-500 text-white",
        light: "bg-bg-300 hover:bg-bg-500",
        outline: "border border-bg-500 bg-bg-300 hover:bg-bg-400",
        ghost: "bg-transparent hover:bg-bg-500/25 shadow-none",
        link: "text-accent-500 underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      },
      size: {
        default: "px-4 py-2",
        small: "px-3 py-1.5 text-sm",
        icon: "size-9 aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const Tag = motion.create(Comp as ElementType);

  return (
    <Tag
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      whileTap={{
        opacity: 0.7,
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
