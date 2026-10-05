import type { BadgeVariant, ProcessExpectation } from "@/lib/icons";
import type { StageTypeName } from "@/types/stages";

export type Process = {
  id: string;
  company: string;
  role: string;
  date: string;
  jobUrl: string | null;
  expectation: ProcessExpectation | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProcessInput = {
  company: string;
  role: string;
  date: string;
  jobUrl?: string;
  expectation?: ProcessExpectation;
  note?: string;
};

export type UpdateProcessInput = {
  company: string;
  role: string;
  date: string;
  jobUrl: string | null;
  expectation: Process["expectation"];
  note: string;
};

export type ProcessListItem = Process & {
  previousApplications: number;
  badge: { variant: BadgeVariant; label: string };
  stages: { type: StageTypeName }[];
};

export type ProcessListResponse = {
  process: ProcessListItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type ProcessHistoryItem = Process & { result: string };

export type ProcessHistoryResponse = { history: ProcessHistoryItem[] };

export type ProcessDetailResponse = { process: ProcessListItem };
