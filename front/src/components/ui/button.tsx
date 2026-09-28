import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: `inline-flex items-center justify-center gap-1.5 font-semibold 
         cursor-pointer disabled:cursor-not-allowed`,

  variants: {
    variant: {
      primary: `leading-3.25 text-sm rounded-control text-surface 
                bg-accent px-4 py-4 h-10 hover:bg-accent-hover
                disabled:bg-accent/60`,
      secondary: `leading-3.25 text-sm rounded-control text-surface 
                bg-surface-2 hover:bg-surface-2 border px-4 py-4 h-10 text-ink border-line`,
      icon: `rounded-control text-ink-muted p-1.5
              hover:bg-accent-soft hover:text-accent
              disabled:opacity-50`,
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

export function Button({
  asChild,
  isLoading,
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={buttonVariants({ variant, className })}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          {children}
        </>
      )}
    </Component>
  );
}
