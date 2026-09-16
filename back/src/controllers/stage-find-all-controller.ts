import type { ProcessStageIdParams } from "@/schemas/process-stage-id-params-schema";
import type { FindAllStageService } from "@/services/stage-find-all-service";
import type { FastifyReply, FastifyRequest } from "fastify";

export class FindAllStageController {
  constructor(private findAllStageService: FindAllStageService) {}

  async handle(
    request: FastifyRequest<{ Params: ProcessStageIdParams }>,
    replay: FastifyReply,
  ) {
    const result = await this.findAllStageService.execute(
      request.params.processId,
    );

    return replay.status(200).send(result);
  }
}
