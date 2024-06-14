import { prisma } from "@/lib/prisma";
import { OrganizationsRepository } from "../organizations-repository";
import { Prisma } from "@prisma/client";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }
}
