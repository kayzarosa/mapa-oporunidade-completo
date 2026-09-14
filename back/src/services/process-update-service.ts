import { NotFoundError } from "@/errors/not-found";
import type { ProcessRepository } from "@/models/process-repository";
import type { UpdateProcessInput } from "@/types/process";
import { normalizeCompany } from "@/utils/normalize-company";

export class UpdateProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(id: string, data: UpdateProcessInput) {
    const processExists = await this.processRepository.findById(id);

    if (!processExists) {
      throw new NotFoundError("Process not found!");
    }

    const dataProcess = {
      ...data,
      ...(data.company ? { company: normalizeCompany(data.company) } : {}),
    };

    const updateProcess = await this.processRepository.update(id, dataProcess);

    return { process: updateProcess };
  }
}
