import type { ComponentProps } from "react";
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
  optional?: boolean;
  hint?: string;
  error?: string;
};

export function Input({
  id,
  label,
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
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
        {optional && (
          <span className="font-normal text-ink-faint"> — opcional</span>
        )}
      </label>

      <input
        id={id}
        aria-invalid={hasError}
        aria-describedby={message ? messageId : undefined}
        className={inputStyles({ hasError })}
        {...props}
      />

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
