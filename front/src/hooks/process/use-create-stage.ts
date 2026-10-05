import { api } from "@/lib/api/api";
import type { CreateStageInput, Stage } from "@/types/stages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateStage(processId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateStageInput) =>
      api<{ stage: Stage }>(`/processes/${processId}/stages`, {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stages", processId, "show"],
      });
      queryClient.invalidateQueries({ queryKey: ["processes"] });
    },
  });
}
