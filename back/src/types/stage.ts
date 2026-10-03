export const STAGE_TYPES = {
  triagem: "Triagem",
  tecnica: "Técnica",
  cultural: "Cultural",
  proposta: "Proposta",
} as const;

export const STAGE_STATUS = {
  agendada: "Agendada",
  aguardando: "Aguardando retorno",
  aprovada: "Aprovada",
  reprovada: "Reprovada",
  aceita: "Aceita",
} as const;

export type StageTypeName = keyof typeof STAGE_TYPES;
export type StagesStatus = keyof typeof STAGE_STATUS;

export const STAGE_TYPE_SLUGS = Object.keys(STAGE_TYPES) as [
  StageTypeName,
  ...StageTypeName[],
];

export const STAGE_STATUS_SLUGS = Object.keys(STAGE_STATUS) as [
  StagesStatus,
  ...StagesStatus[],
];

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

type StageBaseInput = {
  processId: string;
  name: string;
  status: StagesStatus;
  date: Date;
  comment?: string;
};

export type CreateStageInput =
  | (StageBaseInput & { type: "triagem" })
  | (StageBaseInput & { type: "cultural" })
  | (StageBaseInput & { type: "tecnica"; challenge: string; deadline: Date })
  | (StageBaseInput & {
      type: "proposta";
      compensation: string;
      benefits: string;
      respondBy: Date;
    });

export type UpdateStageInput = Omit<CreateStageInput, "processId">;

export type UpdateStageData = UpdateStageInput & {
  challenge?: string | null;
  deadline?: Date | null;
  compensation?: string | null;
  benefits?: string | null;
  respondBy?: Date | null;
};
