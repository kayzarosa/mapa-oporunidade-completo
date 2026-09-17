import type { ProcessRepository } from "@/models/process-repository";
import type { ProcessFilters } from "@/types/process";

export class ListProcessService {
  constructor(private processRepository: ProcessRepository) {}

  async execute(filters: ProcessFilters) {
    const { processes, total } = await this.processRepository.findAll(filters);

    const companies = processes.map((process) => process.company);
    const siblings = await this.processRepository.findByCompanies(companies);

    const processesWithHistory = processes.map((process) => ({
      ...process,
      previousApplications: siblings.filter(
        (sibling) =>
          sibling.company === process.company &&
          sibling.createdAt < process.createdAt,
      ).length,
    }));

    return {
      process: processesWithHistory,
      total,
      page: filters.page,
      perPage: filters.perPage,
      totalPages: Math.ceil(total / filters.perPage),
    };
  }
}
