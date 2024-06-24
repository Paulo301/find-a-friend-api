import { makeCreateOrganizationUseCase } from "@/use-cases/factories/organizations/make-create-organization-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    responsible_name: z.string(),
    email: z.string().email(),
    zip_code: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const data = createOrganizationBodySchema.parse(request.body);

  const createOrganizationUseCase = makeCreateOrganizationUseCase();

  await createOrganizationUseCase.execute(data);

  return reply.status(201).send();
}
