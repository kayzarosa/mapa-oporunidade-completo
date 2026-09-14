import { NotFoundError } from "@/errors/not-found";
import type { ProcessRepository } from "@/models/process-repository";

export class HistoryProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(id: string) {
    const findProcess = await this.processRepository.findById(id);

    if (!findProcess) {
      throw new NotFoundError("Process not found!");
    }

    const history = await this.processRepository.findByCompany(
      findProcess.company,
      findProcess.id,
    );

    return { history };
  }
}
