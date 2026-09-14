import z from "zod";

export const processCreateSchema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  expectation: z.enum(["sonho", "gosto muito"]).optional(),
  note: z.string().optional(),
});
