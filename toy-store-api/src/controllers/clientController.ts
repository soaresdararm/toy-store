import { Request, Response } from "express";
import { ClientService } from "../services/clientService";

const clientService = new ClientService();

export const createClient = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;
    const newClient = await clientService.createClient(clientData);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.query;
    const clients = await clientService.getClients(
      typeof name === "string" ? name : undefined,
      typeof email === "string" ? email : undefined
    );
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);
    const clientData = req.body;
    const updatedClient = await clientService.updateClient(
      clientId,
      clientData
    );
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id); 
    await clientService.deleteClient(clientId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};
