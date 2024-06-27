import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/pets/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    environment: z.string(),
    organizationId: z.string(),
  });

  const data = createPetBodySchema.parse(request.body);

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute(data);

  return reply.status(201).send();
}
