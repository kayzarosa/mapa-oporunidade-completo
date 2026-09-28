import { expectationIcons, type ProcessExpectation } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

export type ExpectationOption = ProcessExpectation | "neutro";

export const expectationOptions: {
  value: ExpectationOption;
  label: string;
  icon?: LucideIcon;
  iconClassName?: string;
}[] = [
  { value: "neutro", label: "Neutro — sem marcador" },
  {
    value: "sonho",
    label: "É o sonho",
    icon: expectationIcons.sonho.icon,
    iconClassName: expectationIcons.sonho.className,
  },
  {
    value: "gosto muito",
    label: "Gosto muito",
    icon: expectationIcons["gosto muito"].icon,
    iconClassName: expectationIcons["gosto muito"].className,
  },
];