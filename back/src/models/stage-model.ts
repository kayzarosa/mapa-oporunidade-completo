import { prisma } from "@/lib/prisma";
import type { StageRepository } from "@/models/stage-repository";
import type {
  CreateStageInput,
  StageType,
  UpdateStageInput,
} from "@/types/stage";

export class PrismaStageModel implements StageRepository {
  async create(data: CreateStageInput): Promise<StageType> {
    return await prisma.stage.create({ data });
  }

  async findByProcessId(processId: string): Promise<StageType[]> {
    return await prisma.stage.findMany({
      where: { processId },
      orderBy: { date: "asc" },
    });
  }

  async findById(id: string): Promise<StageType | null> {
    return await prisma.stage.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateStageInput): Promise<StageType> {
    return await prisma.stage.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.stage.delete({ where: { id } });
  }
}
