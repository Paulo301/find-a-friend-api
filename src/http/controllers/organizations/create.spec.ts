import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a organization", async () => {
    const response = await request(app.server).post("/organizations").send({
      state: "Maranhão",
      city: "São Luís",
      neighborhood: "Habitacional Turu",
      street: "Avenida Dois",
      email: "email@email.com",
      name: "Seu cãopanheiro",
      responsible_name: "John Doe",
      password: "123456",
      whatsapp: "98991919191",
      zip_code: "65000000",
      latitude: 0,
      longitude: 0,
    });

    expect(response.statusCode).toEqual(201);
  });
});
