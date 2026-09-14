import type { processCreateSchema } from "@/schemas/process-create-schema";
import type { CreateProcessService } from "@/services/process-create-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type CreateProcessBody = z.infer<typeof processCreateSchema>;

export class CreateProcessController {
  constructor(private createProcessService: CreateProcessService) {}

  async handle(
    request: FastifyRequest<{ Body: CreateProcessBody }>,
    reply: FastifyReply,
  ) {
    const result = await this.createProcessService.execute(request.body);

    return reply.status(201).send(result);
  }
}
