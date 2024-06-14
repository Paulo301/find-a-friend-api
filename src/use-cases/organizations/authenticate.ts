import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateUseCaseParams {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  organization: Organization;
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseParams): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordsMatches = await compare(
      password,
      organization.password_hash
    );

    if (!doesPasswordsMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      organization,
    };
  }
}
