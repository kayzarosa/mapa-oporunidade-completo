import type {
  CreateStageInput,
  StageType,
  UpdateStageInput,
} from "@/types/stage";

export interface StageRepository {
  create(data: CreateStageInput): Promise<StageType>;
  findByProcessId(processId: string): Promise<StageType[]>;
  findById(id: string): Promise<StageType | null>;
  update(id: string, data: UpdateStageInput): Promise<StageType>;
  delete(id: string): Promise<void>;
}
