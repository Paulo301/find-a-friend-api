import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = [];

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id);

    if (!organization) {
      return null;
    }

    return organization;
  }
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      responsible_name: data.responsible_name,
      address: data.address,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      zip_code: data.zip_code,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      updated_at: new Date(),
    } satisfies Organization;

    this.items.push(organization);

    return organization;
  }
}
