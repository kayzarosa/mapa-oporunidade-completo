import type { BadgeTone } from "@/components/badge";
import {
  Archive,
  Check,
  CircleAlert,
  Clock,
  Laugh,
  type LucideIcon,
  Mail,
  Smile,
  Trophy,
} from "lucide-react";

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
  encerrado: { icon: Archive, tone: "closed" },
};

export const expectationIcons: Record<
  ProcessExpectation,
  { icon: LucideIcon; className: string }
> = {
  sonho: { icon: Laugh, className: "text-accent" },
  "gosto muito": { icon: Smile, className: "text-ink-faint" },
};
