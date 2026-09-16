import { NotFoundError } from "@/errors/not-found";
import type { ProcessRepository } from "@/models/process-repository";
import type { StageRepository } from "@/models/stage-repository";

export class FindAllStageService {
  constructor(
    private stageRepository: StageRepository,
    private processRepository: ProcessRepository,
  ) {}

  async execute(processId: string) {
    const processExists = await this.processRepository.findById(processId);

    if (!processExists) {
      throw new NotFoundError("Process not found!");
    }

    const stages = await this.stageRepository.findByProcessId(processId);

    return {
      stages,
    };
  }
}
