import { PROCESS_EXPECTATIONS } from "@/types/process";
import z from "zod";

export const processCreateSchema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  expectation: z.enum(PROCESS_EXPECTATIONS).optional(),
  note: z.string().optional(),
});
