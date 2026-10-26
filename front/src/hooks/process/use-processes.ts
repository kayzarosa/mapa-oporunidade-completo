import { api } from "@/lib/api/api";
import type { StagesStatus, StageTypeName } from "@/lib/stage-types";
import type { ProcessListResponse } from "@/types/process";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type ProcessListParams = {
  page: number;
  company?: string;
  status?: StagesStatus | "todos";
  type?: StageTypeName | "todos";
  expiring?: boolean;
};

export function useProcesses(params: ProcessListParams) {
  const { page, company, status, type, expiring } = params;
  return useQuery({
    queryKey: ["processes", params],
    queryFn: () => {
      const query = new URLSearchParams({ page: String(page), perPage: "10" });
      if (company) query.set("company", company);
      if (status && status !== "todos") query.set("status", status);
      if (type && type !== "todos") query.set("type", type);
      if (expiring) query.set("expiring", "true");

      return api<ProcessListResponse>(`/processes?${query}`);
    },
    placeholderData: keepPreviousData,
  });
}
