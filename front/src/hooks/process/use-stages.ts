import { api } from "@/lib/api/api";
import type { Stage } from "@/types/stages";
import { useQuery } from "@tanstack/react-query";

export function useStages(processId?: string) {
  return useQuery({
    queryKey: ["stages", processId, "show"],
    queryFn: () => api<{ stages: Stage[] }>(`/processes/${processId}/stages`),
    enabled: !!processId,
  });
}
