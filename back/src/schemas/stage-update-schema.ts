import { STAGE_STATUS, STAGE_TYPES } from "@/types/stage";
import z from "zod";

export const stageUpdateSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    type: z.enum(STAGE_TYPES).optional(),
    status: z.enum(STAGE_STATUS).optional(),
    date: z.string().min(1).pipe(z.coerce.date()).optional(),
    comment: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie ao menos um campo para atualizar",
  });
