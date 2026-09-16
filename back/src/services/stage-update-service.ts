import { NotFoundError } from "@/errors/not-found";
import type { StageRepository } from "@/models/stage-repository";
import type { UpdateStageInput } from "@/types/stage";

export class UpdateStageService {
  constructor(private stageRepository: StageRepository) {}

  async execute(id: string, data: UpdateStageInput) {
    const stageExists = await this.stageRepository.findById(id);

    if (!stageExists) {
      throw new NotFoundError("Stage not found!");
    }

    const updateStage = await this.stageRepository.update(id, data);

    return { stage: updateStage };
  }
}
