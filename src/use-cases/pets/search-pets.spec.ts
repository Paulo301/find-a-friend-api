import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organzations-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(organizationsRepository);
    sut = new SearchPetsUseCase(petsRepository);

    await organizationsRepository.create({
      id: "organization-01",
      state: "Maranhão",
      city: "São Luís",
      neighborhood: "Habitacional Turu",
      street: "Avenida Dois",
      email: "email@email.com",
      name: "Seu cãopanheiro",
      responsible_name: "John Doe",
      password_hash: "123456",
      whatsapp: "98991919191",
      zip_code: "65000000",
      latitude: 0,
      longitude: 0,
    });
  });

  it("should be able to search for pets", async () => {
    await petsRepository.create({
      name: "Fido",
      about: "Its a dog",
      age: "Filhote",
      energy_level: "Baixo",
      size: "Pequenino",
      independence_level: "Baixo (pprecisa de companhia sempre)",
      environment: "Ambiente amplo",
      organization_id: "organization-01",
    });

    await petsRepository.create({
      name: "Rex",
      about: "Its a dog",
      age: "Filhote",
      energy_level: "Baixo",
      size: "Pequenino",
      independence_level: "Baixo (pprecisa de companhia sempre)",
      environment: "Ambiente amplo",
      organization_id: "organization-01",
    });

    const { pets } = await sut.execute({
      name: "Fido",
      city: "São Luís",
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Fido" })]);
  });
});
