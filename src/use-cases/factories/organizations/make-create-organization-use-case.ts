import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { CreateOrganizationUseCase } from "@/use-cases/organizations/create-organization";

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository
  );

  return createOrganizationUseCase;
}
