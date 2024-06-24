import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { create } from "./create";

export async function organizationsRoutes(app: FastifyInstance) {
  app.post("/organizations", create);
  app.post("/sessions", authenticate);

  // app.patch("/token/refresh",);
}
