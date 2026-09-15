import z from "zod";

export const processUpdateSchema = z
  .object({
    company: z.string().trim().min(1).optional(),
    role: z.string().trim().min(1).optional(),
    expectation: z.enum(["sonho", "gosto muito"]).nullable().optional(),
    note: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie ao menos um campo para atualizar",
  });
