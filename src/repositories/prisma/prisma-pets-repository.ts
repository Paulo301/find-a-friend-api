import { Prisma } from "@prisma/client";
import { PrismaOrganizationsRepository } from "./prisma-organizations-repository";
import { prisma } from "@/lib/prisma";
import { PetsRepository, SearchManyParams } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  constructor(private orgsRepository: PrismaOrganizationsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async searchMany(params: SearchManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city: params.city,
        },
        age: params.age,
        energy_level: params.energyLevel,
        environment: params.environment,
        independence_level: params.independenceLevel,
        name: {
          contains: params.name,
        },
        size: params.size,
      },
    });

    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    if (!pet) {
      return null;
    }

    return pet;
  }
}
