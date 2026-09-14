import type { ProcessRepository } from "@/models/process-repository";
import type { CreateProcessInput } from "@/types/process";
import { normalizeCompany } from "@/utils/normalize-company";

export class CreateProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(data: CreateProcessInput) {
    const dataProcess = {
      ...data,
      company: normalizeCompany(data.company),
    };

    const newProcess = await this.processRepository.create(dataProcess);

    return { process: newProcess };
  }
}
