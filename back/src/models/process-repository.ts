import type {
  CreateProcessInput,
  PaginatedProcesses,
  ProcessFilters,
  ProcessType,
  ProcessWithStages,
  UpdateProcessInput,
} from "@/types/process";

export interface ProcessRepository {
  create(data: CreateProcessInput): Promise<ProcessType>;
  findAll(filters: ProcessFilters): Promise<PaginatedProcesses>;
  findById(id: string): Promise<ProcessType | null>;
  findByIdWithStages(id: string): Promise<ProcessWithStages | null>;
  findByCompany(
    company: string,
    excludeId: string,
    before: Date,
  ): Promise<ProcessWithStages[]>;
  update(id: string, data: UpdateProcessInput): Promise<ProcessType>;
  delete(id: string): Promise<void>;
  findByCompanies(
    companies: string[],
  ): Promise<Pick<ProcessType, "id" | "company" | "createdAt">[]>;
}
