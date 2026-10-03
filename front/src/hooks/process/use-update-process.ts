import { api } from "@/lib/api/api";
import type { Process } from "@/types/process";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateProcessInput = {
  company: string;
  role: string;
  date: string;
  jobUrl: string | null;
  expectation: Process["expectation"];
  note: string;
};

export function useUpdateProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateProcessInput }) =>
      api<{ process: Process }>(`/processes/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
    },
  });
}
