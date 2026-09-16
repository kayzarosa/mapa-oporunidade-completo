import { STAGE_STATUS_SLUGS } from "@/types/stage";
import z from "zod";

const dateField = z.string().min(1).pipe(z.coerce.date());

const stageBaseSchema = z.object({
  name: z.string().trim().min(1),
  status: z.enum(STAGE_STATUS_SLUGS),
  date: dateField,
  comment: z.string().optional(),
});

export const stageCreateSchema = z.discriminatedUnion("type", [
  stageBaseSchema.extend({ type: z.literal("triagem") }),
  stageBaseSchema.extend({ type: z.literal("cultural") }),
  stageBaseSchema.extend({
    type: z.literal("tecnica"),
    challenge: z.string().trim().min(1),
    deadline: dateField,
  }),
  stageBaseSchema.extend({
    type: z.literal("proposta"),
    compensation: z.string().trim().min(1),
    benefits: z.string().trim().min(1),
    respondBy: dateField,
  }),
]);
