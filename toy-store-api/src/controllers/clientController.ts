import { Request, Response } from "express";

import { ClientService } from "../services/clientService";
const clientService = new ClientService();

export const createClient = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;
    const newClient = await clientService.createClient(clientData);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar cliente.", error });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.query;
    const clients = await clientService.getClients(
      typeof name === "string" ? name : undefined,
      typeof email === "string" ? email : undefined
    );
    res.status(200).json({ clientes: clients });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clientes.", error });
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
    if (!updatedClient) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar cliente.", error });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);
    const ok = await clientService.deleteClient(clientId);
    if (!ok) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover cliente.", error });
  }
};
