import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreatePetUseCaseParams {
  name: string;
  about: string;
  age: string;
  size: string;
  energyLevel: string;
  independenceLevel: string;
  environment: string;
  organizationId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute(
    data: CreatePetUseCaseParams
  ): Promise<CreatePetUseCaseResponse> {
    const { organizationId, energyLevel, independenceLevel, ...rest } = data;

    const organization = this.organizationsRepository.findById(organizationId);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      ...rest,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      organization_id: organizationId,
    });

    return {
      pet,
    };
  }
}
