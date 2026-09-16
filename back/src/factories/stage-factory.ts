import { CreateStageController } from "@/controllers/stage-create-controller";
import { DeleteStageController } from "@/controllers/stage-delete-controller";
import { FindAllStageController } from "@/controllers/stage-find-all-controller";
import { UpdateStageController } from "@/controllers/stage-update-controller";
import { PrismaProcessModel } from "@/models/process-model";
import { PrismaStageModel } from "@/models/stage-model";
import { CreateStageService } from "@/services/stage-create-service";
import { DeleteStageService } from "@/services/stage-delete-service";
import { FindAllStageService } from "@/services/stage-find-all-service";
import { UpdateStageService } from "@/services/stage-update-service";

export function makeStageControllers() {
  const stageRepository = new PrismaStageModel();
  const processRepository = new PrismaProcessModel();

  return {
    createStageController: new CreateStageController(
      new CreateStageService(stageRepository, processRepository),
    ),

    updateStageController: new UpdateStageController(
      new UpdateStageService(stageRepository),
    ),

    deleteStageController: new DeleteStageController(
      new DeleteStageService(stageRepository),
    ),

    findAllStageController: new FindAllStageController(
      new FindAllStageService(stageRepository, processRepository),
    ),
  };
}
