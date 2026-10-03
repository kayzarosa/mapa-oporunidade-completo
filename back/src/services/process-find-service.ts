import { NotFoundError } from "@/errors/not-found";
import { getProcessBadge } from "@/lib/process-badge";
import type { ProcessRepository } from "@/models/process-repository";

export class FindProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(id: string) {
    const process = await this.processRepository.findByIdWithStages(id);

    if (!process) {
      throw new NotFoundError("Process not found");
    }

    const siblings = await this.processRepository.findByCompanies([
      process.company,
    ]);

    return {
      process: {
        ...process,
        previousApplications: siblings.filter(
          (sibling) => sibling.createdAt < process.createdAt,
        ).length,
        badge: getProcessBadge(process.stages[0]),
      },
    };
  }
}
