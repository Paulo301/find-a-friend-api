import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { search } from "./search";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, create);

  app.get("/pets/:petId", get);
  app.get("/pets/search", search);
}
