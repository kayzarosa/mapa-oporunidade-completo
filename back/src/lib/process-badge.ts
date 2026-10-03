import type { Stage } from "@/generated/prisma/client";
import { STAGE_STATUS, type StagesStatus } from "@/types/stage";

const DAY = 1000 * 60 * 60 * 24;

type BadgeVariant =
  | "encerrado"
  | "conquista"
  | "urgente"
  | "atencao"
  | "info"
  | "neutro";

export type ProcessBadge = { variant: BadgeVariant; label: string };

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  });
}

export function getProcessBadge(
  stage: Stage | undefined,
  now = new Date(),
): ProcessBadge {
  if (!stage) return { variant: "neutro", label: "Candidatura enviada" };

  if (stage.status === "reprovada")
    return { variant: "encerrado", label: "Seguiu em frente" };

  if (stage.type === "proposta" && stage.status === "aceita")
    return { variant: "conquista", label: "Consegui!" };

  const due = stage.deadline ?? stage.respondBy;
  const daysLeft = due ? (due.getTime() - now.getTime()) / DAY : null;
  const what = stage.type === "tecnica" ? "Desafio" : "Resposta";

  if (due && daysLeft !== null && daysLeft < 2) {
    const days = Math.ceil(daysLeft);
    if (days <= 0)
      return { variant: "urgente", label: `${what}: prazo venceu` };
    if (days === 1)
      return { variant: "urgente", label: `${what} vence amanhã` };
    return { variant: "urgente", label: `${what} vence em ${days} dias` };
  }

  const idleDays = Math.floor(
    (now.getTime() - stage.updatedAt.getTime()) / DAY,
  );
  if (idleDays > 7)
    return { variant: "atencao", label: `${idleDays} dias sem retorno` };

  if (due) {
    const verb = stage.type === "tecnica" ? "Entregar" : "Responder";
    return { variant: "info", label: `${verb} até ${formatDate(due)}` };
  }

  return {
    variant: "neutro",
    label: STAGE_STATUS[stage.status as StagesStatus],
  };
}
