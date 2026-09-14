import { NotFoundError } from "@/errors/not-found";
import type { ProcessRepository } from "@/models/process-repository";

export class DeleteProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(id: string) {
    const processExists = await this.processRepository.findById(id);

    if (!processExists) {
      throw new NotFoundError("Process not found!");
    }

    await this.processRepository.delete(id);

    return;
  }
}
