import type {
  CreateStageInput,
  StageType,
  UpdateStageData,
} from "@/types/stage";

export interface StageRepository {
  create(data: CreateStageInput): Promise<StageType>;
  findByProcessId(processId: string): Promise<StageType[]>;
  findById(id: string): Promise<StageType | null>;
  update(id: string, data: UpdateStageData): Promise<StageType>;
  delete(id: string): Promise<void>;
}
