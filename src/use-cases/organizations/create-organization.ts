import { OrganizationsRepository } from "@/repositories/organizations-repository";
import { Organization } from "@prisma/client";
import { hash } from "bcryptjs";

interface CreateOrganizationUseCaseParams {
  name: string;
  responsible_name: string;
  email: string;
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  whatsapp: string;
  password: string;
  latitude: number;
  longitude: number;
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization;
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(
    data: CreateOrganizationUseCaseParams
  ): Promise<CreateOrganizationUseCaseResponse> {
    const { password, ...rest } = data;
    const password_hash = await hash(password, 6);

    const organization = await this.organizationsRepository.create({
      ...rest,
      password_hash,
    });

    return {
      organization,
    };
  }
}
