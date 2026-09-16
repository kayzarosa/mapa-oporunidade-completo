import { PROCESS_EXPECTATION_SLUGS } from "@/types/process";
import z from "zod";

export const processListSchema = z.object({
  company: z.string().trim().min(1).optional(),
  expectation: z.enum(PROCESS_EXPECTATION_SLUGS).optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(10),
});
