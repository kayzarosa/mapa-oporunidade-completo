import { statusBadges, type StageStatus } from "@/lib/icons";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  base: "inline-flex w-fit items-center gap-1.5 rounded-badge text-xs",

  variants: {
    tone: {
      neutral: "text-ink-muted",
      accent: "bg-accent-soft text-accent px-2 py-1",
      danger: "bg-danger-soft text-danger px-2 py-1",
      warning: "bg-warning-soft text-warning px-2 py-1",
      success: "bg-success-soft text-success px-2 py-1",
      closed: "bg-closed-soft text-closed",
    },
  },

  defaultVariants: {
    tone: "neutral",
  },
});

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;

type BadgeProps = ComponentProps<"span"> & {
  variant: StageStatus;
};

export function Badge({ variant, className, children, ...props }: BadgeProps) {
  const { icon: Icon, tone } = statusBadges[variant];

  return (
    <span className={badgeVariants({ tone, className })} {...props}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
