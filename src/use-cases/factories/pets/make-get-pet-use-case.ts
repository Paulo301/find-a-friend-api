import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetUseCase } from "@/use-cases/pets/get-pet";

export function makeGetPetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const petsRepository = new PrismaPetsRepository(organizationsRepository);
  const getPetUseCase = new GetPetUseCase(petsRepository);

  return getPetUseCase;
}
