import {
  Mail,
  Laugh,
  Smile,
  type LucideIcon,
  CircleAlert,
  Clock,
  Check,
  Trophy,
  Leaf,
} from "lucide-react";
import type { BadgeTone } from "@/components/badge";

export type BadgeVariant =
  | "urgente"
  | "atencao"
  | "info"
  | "sucesso"
  | "conquista"
  | "neutro"
  | "encerrado";

export type ProcessExpectation = "sonho" | "gosto muito";

export const statusBadges: Record<
  BadgeVariant,
  { icon: LucideIcon | null; tone: BadgeTone }
> = {
  urgente: { icon: CircleAlert, tone: "danger" },
  atencao: { icon: Mail, tone: "warning" },
  info: { icon: Clock, tone: "accent" },
  sucesso: { icon: Check, tone: "success" },
  conquista: { icon: Trophy, tone: "success" },
  neutro: { icon: null, tone: "neutral" },
  encerrado: { icon: Leaf, tone: "closed" },
};

export const expectationIcons: Record<
  ProcessExpectation,
  { icon: LucideIcon; className: string }
> = {
  sonho: { icon: Laugh, className: "text-accent" },
  "gosto muito": { icon: Smile, className: "text-ink-faint" },
};
