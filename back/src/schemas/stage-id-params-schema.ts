import z from "zod";

export const stageIdParamsSchema = z.object({
  id: z.uuid(),
});

export type StageIdParams = z.infer<typeof stageIdParamsSchema>;
