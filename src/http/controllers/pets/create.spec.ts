import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/utils/test/create-and-authenticate-organization";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token, organization } =
      await createAndAuthenticateOrganization(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Fido",
        about: "Its a dog",
        age: "Filhote",
        energyLevel: "Baixo",
        size: "Pequenino",
        independenceLevel: "Baixo (precisa de companhia sempre)",
        environment: "Ambiente amplo",
        organizationId: organization.id,
      });

    expect(response.statusCode).toEqual(201);
  });
});
