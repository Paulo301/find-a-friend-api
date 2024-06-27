import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const organization = await prisma.organization.create({
    data: {
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
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "email@email.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
    organization,
  };
}
