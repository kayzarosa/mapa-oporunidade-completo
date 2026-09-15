import type { processIdParamsSchema } from "@/schemas/process-id-params-schema";
import type { DeleteProcessService } from "@/services/process-delete-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type ProcessIdParams = z.infer<typeof processIdParamsSchema>;

export class DeleteProcessController {
  constructor(private deleteProcessService: DeleteProcessService) {}

  async handle(
    request: FastifyRequest<{
      Params: ProcessIdParams;
    }>,
    reply: FastifyReply,
  ) {
    const result = await this.deleteProcessService.execute(request.params.id);

    return reply.status(204).send(result);
  }
}
