import { PROCESS_EXPECTATION_SLUGS } from "@/types/process";
import z from "zod";

const dateField = z.string().min(1).pipe(z.coerce.date());

export const processCreateSchema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  date: dateField,
  jobUrl: z
    .string()
    .trim()
    .transform((value) =>
      /^https?:\/\//i.test(value) ? value : `https://${value}`,
    )
    .pipe(z.httpUrl()).optional(),
  expectation: z.enum(PROCESS_EXPECTATION_SLUGS).optional(),
  note: z.string().optional(),
});
