import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organzations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);

    await organizationsRepository.create({
      state: "Maranhão",
      city: "São Luís",
      neighborhood: "Habitacional Turu",
      street: "Avenida Dois",
      email: "email@email.com",
      name: "Seu cãopanheiro",
      responsible_name: "John Doe",
      password_hash: await hash("123456", 6),
      whatsapp: "98991919191",
      zip_code: "65000000",
      latitude: 0,
      longitude: 0,
    });
  });

  it("should be able to authenticate", async () => {
    const { organization } = await sut.execute({
      email: "email@email.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "emails@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await expect(
      sut.execute({
        email: "email@email.com",
        password: "12345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
