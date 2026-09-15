import z from "zod";

export const processIdParamsSchema = z.object({
  id: z.uuid(),
});
