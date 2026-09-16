export const PROCESS_EXPECTATIONS = ["sonho", "gosto muito"] as const;

export type ProcessExpectation = (typeof PROCESS_EXPECTATIONS)[number];

export type ProcessType = {
  id: string;
  company: string;
  role: string;
  expectation: string | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProcessInput = {
  company: string;
  role: string;
  expectation?: string;
  note?: string;
};

export type UpdateProcessInput = {
  company?: string;
  role?: string;
  expectation?: string | null;
  note?: string;
};

export type ProcessFilters = {
  company?: string;
  expectation?: string;
  page: number;
  perPage: number;
};

export type PaginatedProcesses = {
  processes: ProcessType[];
  total: number;
};
