import { api } from "@/lib/api/api";
import type { Stage, UpdateStageInput } from "@/types/stages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStage(processId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateStageInput }) =>
      api<{ stage: Stage }>(`/stages/${id}`, {
        method: "PUT",
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
