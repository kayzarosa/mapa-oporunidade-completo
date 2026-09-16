import z from "zod";

export const processStageIdParamsSchema = z.object({
  processId: z.uuid(),
});

export type ProcessStageIdParams = z.infer<typeof processStageIdParamsSchema>;
