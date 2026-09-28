import type { Stage } from "@/generated/prisma/client";

export const PROCESS_EXPECTATIONS = {
  sonho: "É o sonho",
  "gosto muito": "Gosto muito",
} as const;

export type ProcessExpectation = keyof typeof PROCESS_EXPECTATIONS;

export const PROCESS_EXPECTATION_SLUGS = Object.keys(PROCESS_EXPECTATIONS) as [
  ProcessExpectation,
  ...ProcessExpectation[],
];

export type ProcessType = {
  id: string;
  company: string;
  role: string;
  expectation: string | null;
  date: Date;
  jobUrl: string | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProcessInput = {
  company: string;
  role: string;
  expectation?: string;
  date: Date;
  jobUrl?: string;
  note?: string;
};

export type UpdateProcessInput = {
  company?: string;
  role?: string;
  expectation?: string | null;
  date?: Date;
  jobUrl?: string | null;
  note?: string;
};

export type ProcessFilters = {
  company?: string;
  expectation?: string;
  page: number;
  perPage: number;
};

export type PaginatedProcesses = {
  processes: (ProcessType & { stages: Stage[] })[];
  total: number;
};
