import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsUseCaseParams {
  city: string;
  age?: string;
  size?: string;
  energyLevel?: string;
  independenceLevel?: string;
  environment?: string;
  name?: string;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: SearchPetsUseCaseParams
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(data);

    return {
      pets,
    };
  }
}
