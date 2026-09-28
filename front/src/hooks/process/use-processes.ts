import { api } from "@/lib/api/api";
import type { ProcessListResponse } from "@/types/process";
import { useQuery } from "@tanstack/react-query";

export function useProcesses() {
  return useQuery({
    queryKey: ["processes"],
    queryFn: () => api<ProcessListResponse>("/processes"),
  });
}
