import type { processListSchema } from "@/schemas/process-list-schema";
import type { ListProcessService } from "@/services/process-list-service";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";

export type ListProcessQuery = z.infer<typeof processListSchema>;

export class ListProcessController {
  constructor(private listProcessService: ListProcessService) {}

  async handle(
    request: FastifyRequest<{ Querystring: ListProcessQuery }>,
    replay: FastifyReply,
  ) {
    const result = await this.listProcessService.execute(request.query);

    return replay.status(200).send(result);
  }
}
