export type StageTypeName = "triagem" | "tecnica" | "cultural" | "proposta";

export type Stage = {
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
