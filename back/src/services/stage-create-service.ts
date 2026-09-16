import { NotFoundError } from "@/errors/not-found";
import type { ProcessRepository } from "@/models/process-repository";
import type { StageRepository } from "@/models/stage-repository";
import type { CreateStageInput } from "@/types/stage";

export class CreateStageService {
  constructor(
    private stageRepository: StageRepository,
    private processRepository: ProcessRepository,
  ) {}

  async execute(data: CreateStageInput) {
    const processExists = await this.processRepository.findById(data.processId);

    if (!processExists) {
      throw new NotFoundError("Process not found!");
    }

    const newStage = await this.stageRepository.create(data);

    return { stage: newStage };
  }
}
