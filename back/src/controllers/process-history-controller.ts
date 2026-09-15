import type { processIdParamsSchema } from "@/schemas/process-id-params-schema";
import type { HistoryProcessService } from "@/services/process-history-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type ProcessIdParams = z.infer<typeof processIdParamsSchema>;

export class HistoryProcessController {
  constructor(private historyProcessService: HistoryProcessService) {}

  async handle(
    request: FastifyRequest<{
      Params: ProcessIdParams;
    }>,
    reply: FastifyReply,
  ) {
    const result = await this.historyProcessService.execute(request.params.id);

    return reply.status(200).send(result);
  }
}
