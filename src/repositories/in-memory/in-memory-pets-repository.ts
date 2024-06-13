import { Pet, Prisma } from "@prisma/client";
import { PetsRepository, SearchManyParams } from "../pets-repository";
import { randomUUID } from "node:crypto";
import { InMemoryOrganizationsRepository } from "./in-memory-organzations-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrganizationsRepository) {}

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

  async searchMany(params: SearchManyParams) {
    const orgs = this.orgsRepository.items.filter(
      (item) => item.city === params.city
    );
    const pets = this.items
      .filter((item) => orgs.some((org) => org.id === item.organization_id))
      .filter((item) => (params.age ? params.age === item.age : true))
      .filter((item) =>
        params.energyLevel ? params.energyLevel === item.energy_level : true
      )
      .filter((item) =>
        params.environment ? params.environment === item.environment : true
      )
      .filter((item) =>
        params.independenceLevel
          ? params.independenceLevel === item.independence_level
          : true
      )
      .filter((item) => (params.name ? params.name === item.name : true))
      .filter((item) => (params.size ? params.size === item.size : true));

    return pets;
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }
}
