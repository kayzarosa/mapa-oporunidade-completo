import type { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectFieldOption<T extends string> = {
  value: T;
  label: string;
  icon?: LucideIcon;
  iconClassName?: string;
};

type SelectFieldProps<T extends string> = {
  id: string;
  label: string;
  options: SelectFieldOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  placeholder?: string;
  optional?: boolean;
  error?: string;
  className?: string;
};

export function SelectField<T extends string>({
  id,
  label,
  options,
  value,
  onValueChange,
  placeholder,
  optional,
  error,
  className,
}: SelectFieldProps<T>) {
  return (
    <div className={twMerge("flex w-full flex-col gap-1", className)}>
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
        {optional && (
          <span className="font-normal text-ink-faint"> — opcional</span>
        )}
      </label>

      <Select value={value} onValueChange={(next) => onValueChange(next as T)}>
        <SelectTrigger id={id} className={error ? "border-danger" : undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map(({ value, label, icon: Icon, iconClassName }) => (
            <SelectItem key={value} value={value}>
              <span className="flex items-center gap-2">
                {Icon && <Icon size={16} className={iconClassName} />}
                {label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
