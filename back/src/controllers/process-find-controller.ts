import type { processIdParamsSchema } from "@/schemas/process-id-params-schema";
import type { FindProcessService } from "@/services/process-find-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type FindProcessQuery = z.infer<typeof processIdParamsSchema>;

export class FindProcessController {
  constructor(private findProcessService: FindProcessService) {}

  async handle(
    request: FastifyRequest<{ Params: FindProcessQuery }>,
    replay: FastifyReply,
  ) {
    const result = await this.findProcessService.execute(request.params.id);

    return replay.status(200).send(result);
  }
}
