import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrganization } from "@/utils/test/create-and-authenticate-organization";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets by filters", async () => {
    const { organization } = await createAndAuthenticateOrganization(app);

    await prisma.pet.create({
      data: {
        name: "Fido",
        about: "Its a dog",
        age: "Filhote",
        energy_level: "Baixo",
        size: "Pequenino",
        independence_level: "Baixo (precisa de companhia sempre)",
        environment: "Ambiente amplo",
        organization_id: organization.id,
      },
    });

    await prisma.pet.create({
      data: {
        name: "Rex",
        about: "Its a dog",
        age: "Adulto",
        energy_level: "Alto",
        size: "Grande",
        independence_level: "Alto",
        environment: "Ambiente muito amplo",
        organization_id: organization.id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/search`)
      .query({
        city: "São Luís",
        age: "Adulto",
        size: "Grande",
        energyLevel: "Alto",
        independenceLevel: "Alto",
        environment: "Ambiente muito amplo",
        name: "Rex",
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: "Rex",
      }),
    ]);
  });
});
