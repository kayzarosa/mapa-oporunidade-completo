import type { ProcessIdParams } from "@/schemas/process-id-params-schema";
import type { DeleteProcessService } from "@/services/process-delete-service";
import type { FastifyReply, FastifyRequest } from "fastify";

export class DeleteProcessController {
  constructor(private deleteProcessService: DeleteProcessService) {}

  async handle(
    request: FastifyRequest<{
      Params: ProcessIdParams;
    }>,
    reply: FastifyReply,
  ) {
    await this.deleteProcessService.execute(request.params.id);

    return reply.status(204).send();
  }
}
