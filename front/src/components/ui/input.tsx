import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const inputStyles = tv({
  base: `h-10 w-full rounded-control border bg-surface px-3 py-2 text-sm text-ink
         outline-none transition-colors placeholder:text-ink-faint focus:border-accent
         disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-ink-faint`,
  variants: {
    hasError: {
      true: "border-danger focus:border-danger",
      false: "border-line",
    },
  },
});

type InputProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  hideLabel?: boolean;
  icon?: ReactNode;
  optional?: boolean;
  hint?: string;
  error?: string;
};

export function Input({
  id,
  label,
  hideLabel,
  icon,
  optional,
  hint,
  error,
  className,
  ...props
}: InputProps) {
  const hasError = !!error;
  const message = error ?? hint;
  const messageId = `${id}-message`;

  return (
    <div className={twMerge("flex w-full flex-col gap-1", className)}>
      <label
        htmlFor={id}
        className={hideLabel ? "sr-only" : `text-[14px] font-medium text-ink`}
      >
        {label}
        {optional && (
          <span className="font-normal text-ink-faint"> — opcional</span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">
            {icon}
          </span>
        )}
        <input
          id={id}
          aria-invalid={hasError}
          aria-describedby={message ? messageId : undefined}
          className={inputStyles({
            hasError,
            className: icon ? "pl-9" : undefined,
          })}
          {...props}
        />
      </div>

      {message && (
        <span
          id={messageId}
          className={
            hasError ? "text-xs text-danger" : "text-xs text-ink-faint"
          }
        >
          {message}
        </span>
      )}
    </div>
  );
}
