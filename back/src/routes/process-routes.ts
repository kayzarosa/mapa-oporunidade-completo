import {
  CreateProcessController,
  type CreateProcessBody,
} from "@/controllers/process-create-controller";
import {
  ListProcessController,
  type ListProcessQuery,
} from "@/controllers/process-list-controller";
import { validate } from "@/middlewares/validate-middleware";
import { PrismaProcessModel } from "@/models/process-model";
import { processCreateSchema } from "@/schemas/process-create-schema";
import { processListSchema } from "@/schemas/process-list-schema";
import { CreateProcessService } from "@/services/process-create-service";
import { ListProcessService } from "@/services/process-list-service";
import type { FastifyInstance } from "fastify";

export async function processRoutes(app: FastifyInstance) {
  const processRepository = new PrismaProcessModel();

  const createProcessController = new CreateProcessController(
    new CreateProcessService(processRepository),
  );

  app.post<{ Body: CreateProcessBody }>(
    "/processes",
    { preHandler: validate({ body: processCreateSchema }) },
    (request, replay) => createProcessController.handle(request, replay),
  );

  const listProcessController = new ListProcessController(
    new ListProcessService(processRepository),
  );

  app.get<{ Querystring: ListProcessQuery }>(
    "/processes",
    { preHandler: validate({ querystring: processListSchema }) },
    (request, replay) => listProcessController.handle(request, replay),
  );
}
