import { makeGetPetUseCase } from "@/use-cases/factories/pets/make-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const data = getPetParamsSchema.parse(request.params);

  const getPetUseCase = makeGetPetUseCase();

  const { pet } = await getPetUseCase.execute(data);

  return reply.status(200).send({ pet });
}
