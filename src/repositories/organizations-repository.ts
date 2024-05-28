import { Organization } from "@prisma/client";

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>;
}
