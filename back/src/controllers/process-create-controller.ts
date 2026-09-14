import { processCreateSchema } from "@/schemas/process-create-schema";
import type { CreateProcessService } from "@/services/process-create-service";
import type { FastifyReply, FastifyRequest } from "fastify";

export class CreateProcessController {
  constructor(private createProcessService: CreateProcessService) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data = processCreateSchema.parse(request.body);

    const result = await this.createProcessService.execute(data);

    return reply.status(201).send(result);
  }
}
