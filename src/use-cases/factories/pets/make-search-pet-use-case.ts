import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "@/use-cases/pets/search-pets";

export function makeSearchPetsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const petsRepository = new PrismaPetsRepository(organizationsRepository);
  const searchPetsUseCase = new SearchPetsUseCase(petsRepository);

  return searchPetsUseCase;
}
