import { api } from "@/lib/api/api";
import type { ProcessDetailResponse } from "@/types/process";
import { useQuery } from "@tanstack/react-query";

export function useFindProcesses(id?: string) {
  return useQuery({
    queryKey: ["processes", id, "show"],
    queryFn: () => api<ProcessDetailResponse>(`/processes/${id}`),
    enabled: !!id,
  });
}
