export const STAGE_TYPES = [
  "triagem",
  "tecnica",
  "cultural",
  "proposta",
] as const;

export const STAGE_STATUS = [
  "agendada",
  "aguardando",
  "aprovada",
  "reprovada",
  "aceita",
] as const;

export type StageTypeName = (typeof STAGE_TYPES)[number];
export type StageStatus = (typeof STAGE_STATUS)[number];

export type StageType = {
  id: string;
  name: string;
  type: string;
  status: string;
  date: Date;
  comment: string | null;
  challenge: string | null;
  deadline: Date | null;
  compensation: string | null;
  benefits: string | null;
  respondBy: Date | null;
  processId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateStageInput = {
  processId: string;
  name: string;
  type: string;
  status: string;
  date: Date;
  comment?: string;
};

export type UpdateStageInput = {
  name?: string;
  type?: string;
  status?: string;
  date?: Date;
  comment?: string | null;
};
