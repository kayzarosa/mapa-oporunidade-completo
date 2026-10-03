import type { CreateProcessBody } from "@/controllers/process-create-controller";
import type { ListProcessQuery } from "@/controllers/process-list-controller";
import type { UpdateProcessBody } from "@/controllers/process-update-controller";
import { makeProcessControllers } from "@/factories/process-factory";
import { validate } from "@/middlewares/validate-middleware";
import { processCreateSchema } from "@/schemas/process-create-schema";
import {
  type ProcessIdParams,
  processIdParamsSchema,
} from "@/schemas/process-id-params-schema";
import { processListSchema } from "@/schemas/process-list-schema";
import { processUpdateSchema } from "@/schemas/process-update-schema";
import type { FastifyInstance } from "fastify";

export async function processRoutes(app: FastifyInstance) {
  const {
    createProcessController,
    listProcessController,
    findProcessController,
    updateProcessController,
    deleteProcessController,
    historyProcessController,
  } = makeProcessControllers();

  app.post<{ Body: CreateProcessBody }>(
    "/processes",
    { preHandler: validate({ body: processCreateSchema }) },
    (request, replay) => createProcessController.handle(request, replay),
  );

  app.get<{ Querystring: ListProcessQuery }>(
    "/processes",
    { preHandler: validate({ querystring: processListSchema }) },
    (request, replay) => listProcessController.handle(request, replay),
  );

  app.get<{ Params: ProcessIdParams }>(
    "/processes/:id",
    { preHandler: validate({ params: processIdParamsSchema }) },
    (request, replay) => findProcessController.handle(request, replay),
  );

  app.put<{ Params: ProcessIdParams; Body: UpdateProcessBody }>(
    "/processes/:id",
    {
      preHandler: validate({
        params: processIdParamsSchema,
        body: processUpdateSchema,
      }),
    },
    (request, replay) => updateProcessController.handle(request, replay),
  );

  app.delete<{ Params: ProcessIdParams }>(
    "/processes/:id",
    {
      preHandler: validate({
        params: processIdParamsSchema,
      }),
    },
    (request, replay) => deleteProcessController.handle(request, replay),
  );

  app.get<{ Params: ProcessIdParams }>(
    "/processes/:id/history",
    {
      preHandler: validate({
        params: processIdParamsSchema,
      }),
    },
    (request, replay) => historyProcessController.handle(request, replay),
  );
}
