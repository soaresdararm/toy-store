import {
  createClient as createClientDb,
  getAllClients,
  getClientById,
  updateClient as updateClientDb,
  deleteClient as deleteClientDb,
  Client,
} from "../models/client";

export class ClientService {
  async createClient(clientData: Client) {
    const id = await createClientDb(clientData);
    return { ...clientData, id };
  }

  async getClients(name?: string, email?: string) {
    let clients = await getAllClients();
    if (name) {
      clients = clients.filter((c) =>
        c.nomeCompleto.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (email) {
      clients = clients.filter((c) =>
        c.email.toLowerCase().includes(email.toLowerCase())
      );
    }
    return clients;
  }

  async updateClient(id: number, updatedData: Partial<Client>) {
    const ok = await updateClientDb(id, updatedData);
    if (!ok) return null;
    return getClientById(id);
  }

  async deleteClient(id: number) {
    return deleteClientDb(id);
  }
}
