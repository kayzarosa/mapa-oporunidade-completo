import { api } from "@/lib/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      api<void>(`/processes/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
    },
  });
}
