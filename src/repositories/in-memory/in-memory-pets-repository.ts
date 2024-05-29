import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      about: data.about,
      age: data.age,
      energy_level: data.energy_level,
      environment: data.environment,
      independence_level: data.independence_level,
      organization_id: data.organization_id,
      name: data.name,
      size: data.size,
      created_at: new Date(),
      updated_at: new Date(),
    } satisfies Pet;

    this.items.push(pet);

    return pet;
  }
}
