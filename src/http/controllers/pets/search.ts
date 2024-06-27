import { makeSearchPetsUseCase } from "@/use-cases/factories/pets/make-search-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independenceLevel: z.string().optional(),
    environment: z.string().optional(),
    name: z.string().optional(),
  });

  const data = searchPetQuerySchema.parse(request.query);

  const searchPetUseCase = makeSearchPetsUseCase();

  const pets = await searchPetUseCase.execute(data);

  return reply.status(200).send(pets);
}
