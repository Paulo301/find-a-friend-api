import { Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";

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
}
