import { PROCESS_EXPECTATION_SLUGS } from "@/types/process";
import z from "zod";

export const processCreateSchema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  expectation: z.enum(PROCESS_EXPECTATION_SLUGS).optional(),
  note: z.string().optional(),
});
