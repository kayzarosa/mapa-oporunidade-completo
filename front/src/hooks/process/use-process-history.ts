import { api } from "@/lib/api/api";
import type { ProcessHistoryResponse } from "@/types/process";
import { useQuery } from "@tanstack/react-query";

export function useProcessHistory(id?: string) {
  return useQuery({
    queryKey: ["processes", id, "history"],
    queryFn: () => api<ProcessHistoryResponse>(`/processes/${id}/history`),
    enabled: !!id,
  });
}
