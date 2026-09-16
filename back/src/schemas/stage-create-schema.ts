import { STAGE_STATUS, STAGE_TYPES } from "@/types/stage";
import z from "zod";

export const stageCreateSchema = z.object({
  name: z.string().trim().min(1),
  type: z.enum(STAGE_TYPES),
  status: z.enum(STAGE_STATUS),
  date: z.string().min(1).pipe(z.coerce.date()),
  comment: z.string().optional(),
});
