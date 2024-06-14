import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "@/use-cases/pets/create-pet";

export function makeCreatePetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const petsRepository = new PrismaPetsRepository(organizationsRepository);
  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    organizationsRepository
  );

  return createPetUseCase;
}
