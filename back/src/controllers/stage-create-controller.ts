import type { ProcessStageIdParams } from "@/schemas/process-stage-id-params-schema";
import type { stageCreateSchema } from "@/schemas/stage-create-schema";
import type { CreateStageService } from "@/services/stage-create-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type CreateStageBody = z.infer<typeof stageCreateSchema>;

export class CreateStageController {
  constructor(private createStageService: CreateStageService) {}

  async handle(
    request: FastifyRequest<{
      Params: ProcessStageIdParams;
      Body: CreateStageBody;
    }>,
    reply: FastifyReply,
  ) {
    const data = {
      ...request.body,
      processId: request.params.processId,
    };
    const result = await this.createStageService.execute(data);

    return reply.status(201).send(result);
  }
}
