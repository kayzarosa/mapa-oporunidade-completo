import { PROCESS_EXPECTATIONS } from "@/types/process";
import z from "zod";

export const processUpdateSchema = z
  .object({
    company: z.string().trim().min(1).optional(),
    role: z.string().trim().min(1).optional(),
    expectation: z.enum(PROCESS_EXPECTATIONS).nullable().optional(),
    note: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie ao menos um campo para atualizar",
  });
