import type { Stage } from "@/generated/prisma/client";

export function getProcessResult(stage: Stage | undefined) {
  if (stage?.status === "reprovado") return "Não avancei";
  if (stage?.type === "proposta" && stage.status === "aceita")
    return "Consegui!";
  return "Sem desfecho";
}
