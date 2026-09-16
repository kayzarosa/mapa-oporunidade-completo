import type { StageIdParams } from "@/schemas/stage-id-params-schema";
import type { DeleteStageService } from "@/services/stage-delete-service";
import type { FastifyReply, FastifyRequest } from "fastify";

export class DeleteStageController {
  constructor(private deleteStageService: DeleteStageService) {}

  async handle(
    request: FastifyRequest<{
      Params: StageIdParams;
    }>,
    reply: FastifyReply,
  ) {
    await this.deleteStageService.execute(request.params.id);

    return reply.status(204).send();
  }
}
