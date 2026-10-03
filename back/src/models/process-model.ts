import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProcessRepository } from "@/models/process-repository";
import type {
  CreateProcessInput,
  PaginatedProcesses,
  ProcessFilters,
  ProcessType,
  ProcessWithStages,
  UpdateProcessInput,
} from "@/types/process";

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
      ...(expectation ? { expectation } : {}),
    };

    const [processes, total] = await prisma.$transaction([
      prisma.process.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
        include: { stages: { orderBy: { date: "desc" }, take: 1 } },
      }),
      prisma.process.count({ where }),
    ]);

    return { processes, total };
  }

  async findById(id: string): Promise<ProcessType | null> {
    return await prisma.process.findUnique({ where: { id } });
  }

  async findByIdWithStages(id: string): Promise<ProcessWithStages | null> {
    return await prisma.process.findUnique({
      where: { id },
      include: { stages: { orderBy: { date: "desc" }, take: 1 } },
    });
  }

  async findByCompany(
    company: string,
    excludeId: string,
    before: Date,
  ): Promise<ProcessWithStages[]> {
    return await prisma.process.findMany({
      where: {
        company,
        id: { not: excludeId },
        createdAt: { lt: before },
      },
      orderBy: { createdAt: "desc" },
      include: { stages: { orderBy: { date: "desc" }, take: 1 } },
    });
  }

  async update(id: string, data: UpdateProcessInput): Promise<ProcessType> {
    return await prisma.process.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.process.delete({ where: { id } });
  }

  async findByCompanies(
    companies: string[],
  ): Promise<Pick<ProcessType, "id" | "company" | "createdAt">[]> {
    return await prisma.process.findMany({
      where: { company: { in: companies } },
      select: { id: true, company: true, createdAt: true },
    });
  }
}
