import { Pet, Prisma } from "@prisma/client";

export interface SearchManyParams {
  city: string;
  age?: string;
  size?: string;
  energyLevel?: string;
  independenceLevel?: string;
  environment?: string;
  name?: string;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  searchMany(params: SearchManyParams): Promise<Pet[]>;
}
