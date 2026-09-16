import { NotFoundError } from "@/errors/not-found";
import type { StageRepository } from "@/models/stage-repository";

export class DeleteStageService {
  constructor(private stageRepository: StageRepository) {}

  async execute(id: string) {
    const stageExists = await this.stageRepository.findById(id);

    if (!stageExists) {
      throw new NotFoundError("Stage not found!");
    }

    await this.stageRepository.delete(id);

    return;
  }
}
