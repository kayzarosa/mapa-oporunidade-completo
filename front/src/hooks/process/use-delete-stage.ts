import { api } from "@/lib/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteStage(processId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      api<void>(`/stages/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stages", processId, "show"],
      });
      queryClient.invalidateQueries({ queryKey: ["processes"] });
    },
  });
}
