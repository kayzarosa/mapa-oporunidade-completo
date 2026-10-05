import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TextareaProps = ComponentProps<"textarea"> & {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
};

export function Textarea({
  id,
  label,
  optional,
  error,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className={twMerge("flex w-full flex-col gap-1", className)}>
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
        {optional && (
          <span className="font-normal text-ink-faint"> — opcional</span>
        )}
      </label>

      <textarea
        id={id}
        aria-invalid={!!error}
        className={`min-h-16 w-full resize-none rounded-control border bg-surface px-3 py-2
                    text-sm text-ink outline-none transition-colors placeholder:text-ink-faint
                    focus:border-accent ${error ? "border-danger" : "border-line"}`}
        {...props}
      />

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
