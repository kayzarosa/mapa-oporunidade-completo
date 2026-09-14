import type { ProcessRepository } from "@/models/process-repository";
import type {
  CreateProcessInput,
  PaginatedProcesses,
  ProcessFilters,
  ProcessType,
  UpdateProcessInput,
} from "@/types/process";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export class PrismaProcessModel implements ProcessRepository {
  async create(data: CreateProcessInput): Promise<ProcessType> {
    return await prisma.process.create({ data });
  }

  async findAll({
    company,
    expectation,
    page,
    perPage,
  }: ProcessFilters): Promise<PaginatedProcesses> {
    const where: Prisma.ProcessWhereInput = {
      ...(company ? { company: { contains: company } } : {}),
      ...(expectation ? { expectation: { contains: expectation } } : {}),
    };

    const [processes, total] = await prisma.$transaction([
      prisma.process.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.process.count({ where }),
    ]);

    return { processes, total };
  }

  async findById(id: string): Promise<ProcessType | null> {
    return await prisma.process.findUnique({ where: { id } });
  }

  async findByCompany(
    company: string,
    excludeId: string,
  ): Promise<ProcessType[]> {
    return await prisma.process.findMany({
      where: {
        company,
        id: { not: excludeId },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: UpdateProcessInput): Promise<ProcessType> {
    return await prisma.process.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.process.delete({ where: { id } });
  }
}
