export const stageTypeLabels = {
  triagem: "Triagem",
  tecnica: "Técnica",
  cultural: "Cultural",
  proposta: "Proposta",
} as const;

export const stageStatusLabels = {
  agendada: "Agendada",
  aguardando: "Aguardando retorno",
  aprovada: "Aprovada",
  reprovada: "Reprovada",
  aceita: "Aceita",
} as const;

export type StageTypeName = keyof typeof stageTypeLabels;
export type StagesStatus = keyof typeof stageStatusLabels;

export const stageTypeSlugs = Object.keys(stageTypeLabels) as [
  StageTypeName,
  ...StageTypeName[],
];

export const stageStatusSlugs = Object.keys(stageStatusLabels) as [
  StagesStatus,
  ...StagesStatus[],
];

export const stageTypeOptions = stageTypeSlugs.map((value) => ({
  value,
  label: stageTypeLabels[value],
}));

export const stageStatusOptions = stageStatusSlugs.map((value) => ({
  value,
  label: stageStatusLabels[value],
}));

export const stageExtraFields = {
  triagem: [],
  cultural: [],
  tecnica: ["challenge", "deadline"],
  proposta: ["compensation", "benefits", "respondBy"],
} as const;

export type StageExtraField = (typeof stageExtraFields)[StageTypeName][number];

export const allStageExtraFields = Object.values(stageExtraFields).flat();
