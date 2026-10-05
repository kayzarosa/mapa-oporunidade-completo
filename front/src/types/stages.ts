import type { StagesStatus } from "@/lib/stage-types";

export type { StageTypeName, StagesStatus } from "@/lib/stage-types";

export type Stage = {
  id: string;
  name: string;
  type: string;
  status: StagesStatus;
  date: string;
  comment: string | null;
  challenge: string | null;
  deadline: string | null;
  compensation: string | null;
  benefits: string | null;
  respondBy: string | null;
  processId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateStageInput = {
  name: string;
  type: string;
  status: StagesStatus;
  date: string;
  comment?: string;
  challenge?: string;
  deadline?: string;
  compensation?: string;
  benefits?: string;
  respondBy?: string;
};

export type UpdateStageInput = {
  name: string;
  type: string;
  status: StagesStatus;
  date: string;
  comment?: string | null;
  challenge?: string | null;
  deadline?: string | null;
  compensation?: string | null;
  benefits?: string | null;
  respondBy?: string | null;
};
