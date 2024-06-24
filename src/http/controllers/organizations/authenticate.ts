import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/organizations/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticationBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
