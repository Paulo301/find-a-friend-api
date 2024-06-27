import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrganization } from "@/utils/test/create-and-authenticate-organization";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a pet", async () => {
    const { organization } = await createAndAuthenticateOrganization(app);

    const pet = await prisma.pet.create({
      data: {
        name: "Fido",
        about: "Its a dog",
        age: "Filhote",
        energy_level: "Baixo",
        size: "Pequenino",
        independence_level: "Baixo (pprecisa de companhia sempre)",
        environment: "Ambiente amplo",
        organization_id: organization.id,
      },
    });

    const response = await request(app.server).get(`/pets/${pet.id}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet.id).toEqual(pet.id);
  });
});
