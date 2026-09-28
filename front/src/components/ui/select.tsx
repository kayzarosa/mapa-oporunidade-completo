import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={twMerge(
        `group flex h-10 w-full cursor-pointer items-center justify-between gap-2
         rounded-control border border-line bg-surface px-3 py-2 text-sm text-ink outline-none
         focus:border-accent data-[state=open]:border-accent data-placeholder:text-ink-faint`,
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="text-ink-muted transition-transform group-data-[state=open]:rotate-180">
        <ChevronDown className="size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className={twMerge(
          `z-50 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width)
           overflow-y-auto rounded-control border border-line bg-surface p-1`,
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={twMerge(
        `flex cursor-pointer select-none items-center justify-between gap-2 rounded-control
         px-3 py-2 text-sm text-ink outline-none data-highlighted:bg-surface-2`,
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="text-accent">
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
