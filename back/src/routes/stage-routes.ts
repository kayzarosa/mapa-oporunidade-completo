import type { CreateStageBody } from "@/controllers/stage-create-controller";
import type { UpdateStageBody } from "@/controllers/stage-update-controller";
import { makeStageControllers } from "@/factories/stage-factory";
import { validate } from "@/middlewares/validate-middleware";
import {
  type ProcessStageIdParams,
  processStageIdParamsSchema,
} from "@/schemas/process-stage-id-params-schema";
import { stageCreateSchema } from "@/schemas/stage-create-schema";
import {
  type StageIdParams,
  stageIdParamsSchema,
} from "@/schemas/stage-id-params-schema";
import { stageUpdateSchema } from "@/schemas/stage-update-schema";
import type { FastifyInstance } from "fastify";

export async function stageRoutes(app: FastifyInstance) {
  const {
    createStageController,
    updateStageController,
    deleteStageController,
    findAllStageController,
  } = makeStageControllers();

  app.post<{ Params: ProcessStageIdParams; Body: CreateStageBody }>(
    "/processes/:processId/stages",
    {
      preHandler: validate({
        params: processStageIdParamsSchema,
        body: stageCreateSchema,
      }),
    },
    (request, replay) => createStageController.handle(request, replay),
  );

  app.put<{ Params: StageIdParams; Body: UpdateStageBody }>(
    "/stages/:id",
    {
      preHandler: validate({
        params: stageIdParamsSchema,
        body: stageUpdateSchema,
      }),
    },
    (request, replay) => updateStageController.handle(request, replay),
  );

  app.delete<{ Params: StageIdParams }>(
    "/stages/:id",
    {
      preHandler: validate({
        params: stageIdParamsSchema,
      }),
    },
    (request, replay) => deleteStageController.handle(request, replay),
  );

  app.get<{ Params: ProcessStageIdParams }>(
    "/processes/:processId/stages",
    {
      preHandler: validate({
        params: processStageIdParamsSchema,
      }),
    },
    (request, replay) => findAllStageController.handle(request, replay),
  );
}
