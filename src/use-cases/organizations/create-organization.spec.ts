import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organzations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationUseCase } from "./create-organization";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: CreateOrganizationUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new CreateOrganizationUseCase(organizationsRepository);
  });

  it("should be able to create a pet", async () => {
    const { organization } = await sut.execute({
      address: "Algum lugar",
      email: "email@email.com",
      name: "Seu cãopanheiro",
      responsible_name: "John Doe",
      password: "123456",
      whatsapp: "98991919191",
      zip_code: "65000000",
      latitude: 0,
      longitude: 0,
    });

    expect(organization.id).toEqual(expect.any(String));
  });
});
