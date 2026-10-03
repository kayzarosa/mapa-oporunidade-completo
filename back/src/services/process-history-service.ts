import { NotFoundError } from "@/errors/not-found";
import { getProcessResult } from "@/lib/process-result";
import type { ProcessRepository } from "@/models/process-repository";

export class HistoryProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(id: string) {
    const findProcess = await this.processRepository.findById(id);

    if (!findProcess) {
      throw new NotFoundError("Process not found!");
    }

    const processes = await this.processRepository.findByCompany(
      findProcess.company,
      findProcess.id,
      findProcess.createdAt,
    );

    const history = processes.map((item) => ({
      ...item,
      result: getProcessResult(item.stages[0]),
    }));

    return { history };
  }
}
