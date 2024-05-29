import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organzations-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { beforeEach, describe, expect, it } from "vitest";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository, organizationsRepository);

    await organizationsRepository.create({
      id: "organization-01",
      address: "Algum lugar",
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

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      name: "Fido",
      about: "Its a dog",
      age: "Filhote",
      energy_level: "Baixo",
      size: "Pequenino",
      independence_level: "Baixo (pprecisa de companhia sempre)",
      environment: "Ambiente amplo",
      organizationId: "organization-01",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
