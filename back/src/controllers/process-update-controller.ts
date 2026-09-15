import type { processIdParamsSchema } from "@/schemas/process-id-params-schema";
import type { processUpdateSchema } from "@/schemas/process-update-schema";
import type { UpdateProcessService } from "@/services/process-update-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type ProcessIdParams = z.infer<typeof processIdParamsSchema>;
export type UpdateProcessBody = z.infer<typeof processUpdateSchema>;

export class UpdateProcessController {
  constructor(private updateProcessService: UpdateProcessService) {}

  async handle(
    request: FastifyRequest<{
      Params: ProcessIdParams;
      Body: UpdateProcessBody;
    }>,
    reply: FastifyReply,
  ) {
    const result = await this.updateProcessService.execute(
      request.params.id,
      request.body,
    );

    return reply.status(200).send(result);
  }
}
