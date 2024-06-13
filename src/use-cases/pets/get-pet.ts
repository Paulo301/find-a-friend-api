import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetUseCaseParams {
  petId: string;
}

interface GetPetUseCaseResponse {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: GetPetUseCaseParams): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(data.petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
