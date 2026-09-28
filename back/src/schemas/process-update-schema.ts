import { PROCESS_EXPECTATION_SLUGS } from "@/types/process";
import z from "zod";

const dateField = z.string().min(1).pipe(z.coerce.date()).optional();

export const processUpdateSchema = z
  .object({
    company: z.string().trim().min(1).optional(),
    role: z.string().trim().min(1).optional(),
    expectation: z.enum(PROCESS_EXPECTATION_SLUGS).nullable().optional(),
    note: z.string().optional(),
    date: dateField,
    jobUrl: z
      .string()
      .trim()
      .transform((value) =>
        /^https?:\/\//i.test(value) ? value : `https://${value}`,
      )
      .pipe(z.httpUrl())
      .nullable()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie ao menos um campo para atualizar",
  });
