import { api } from "@/lib/api/api";
import type { CreateProcessInput, Process } from "@/types/process";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProcessInput) =>
      api<{ process: Process }>("/processes", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
    },
  });
}
