import Client from "../models/client";

export class ClientService {
  async createClient(clientData: any) {
    return Client.create(clientData);
  }

  async getClients(name?: string, email?: string) {
    const where: any = {};
    if (name) where.nomeCompleto = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    return Client.findAll({ where });
  }

  async updateClient(id: number, updatedData: any) {
    await Client.update(updatedData, { where: { id } });
    return Client.findByPk(id);
  }

  async deleteClient(id: number) {
    return Client.destroy({ where: { id } });
  }


}

import { Op } from "sequelize";
