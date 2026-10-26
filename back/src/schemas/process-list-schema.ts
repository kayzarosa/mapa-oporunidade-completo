import { PROCESS_EXPECTATION_SLUGS } from "@/types/process";
import { STAGE_STATUS_SLUGS, STAGE_TYPE_SLUGS } from "@/types/stage";
import z from "zod";

export const processListSchema = z.object({
  company: z.string().trim().min(1).optional(),
  expectation: z.enum(PROCESS_EXPECTATION_SLUGS).optional(),
  status: z.enum(STAGE_STATUS_SLUGS).optional(),
  type: z.enum(STAGE_TYPE_SLUGS).optional(),
  expiring: z
    .enum(["true"])
    .transform(() => true)
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(10),
});
