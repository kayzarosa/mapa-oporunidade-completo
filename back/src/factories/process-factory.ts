import { CreateProcessController } from "@/controllers/process-create-controller";
import { DeleteProcessController } from "@/controllers/process-delete-controller";
import { HistoryProcessController } from "@/controllers/process-history-controller";
import { ListProcessController } from "@/controllers/process-list-controller";
import { UpdateProcessController } from "@/controllers/process-update-controller";
import { PrismaProcessModel } from "@/models/process-model";
import { CreateProcessService } from "@/services/process-create-service";
import { DeleteProcessService } from "@/services/process-delete-service";
import { HistoryProcessService } from "@/services/process-history-service";
import { ListProcessService } from "@/services/process-list-service";
import { UpdateProcessService } from "@/services/process-update-service";

export function makeProcessControllers() {
  const processRepository = new PrismaProcessModel();

  return {
    createProcessController: new CreateProcessController(
      new CreateProcessService(processRepository),
    ),

    listProcessController: new ListProcessController(
      new ListProcessService(processRepository),
    ),

    updateProcessController: new UpdateProcessController(
      new UpdateProcessService(processRepository),
    ),

    deleteProcessController: new DeleteProcessController(
      new DeleteProcessService(processRepository),
    ),

    historyProcessController: new HistoryProcessController(
      new HistoryProcessService(processRepository),
    ),
  };
}
