import type { StageIdParams } from "@/schemas/stage-id-params-schema";
import type { stageUpdateSchema } from "@/schemas/stage-update-schema";
import type { UpdateStageService } from "@/services/stage-update-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type UpdateStageBody = z.infer<typeof stageUpdateSchema>;

export class UpdateStageController {
  constructor(private updateStageService: UpdateStageService) {}

  async handle(
    request: FastifyRequest<{
      Params: StageIdParams;
      Body: UpdateStageBody;
    }>,
    reply: FastifyReply,
  ) {
    const result = await this.updateStageService.execute(
      request.params.id,
      request.body,
    );

    return reply.status(200).send(result);
  }
}
