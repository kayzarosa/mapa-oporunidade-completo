import type { ProcessRepository } from "@/models/process-repository";
import type { ProcessFilters } from "@/types/process";

export class ListProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(filters: ProcessFilters) {
    const { processes, total } = await this.processRepository.findAll(filters);

    return {
      processes,
      total,
      page: filters.page,
      perPage: filters.perPage,
      totalPages: Math.ceil(total / filters.perPage),
    };
  }
}
