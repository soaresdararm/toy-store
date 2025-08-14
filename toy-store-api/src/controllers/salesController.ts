import { Request, Response } from "express";

import {
  createSale,
  getSalesStatistics,
  getTopClients,
} from "../services/salesService";

export const createSaleController = async (req: Request, res: Response) => {
  try {
    const { clientId, value, date } = req.body;
    const newSale = await createSale(
      Number(clientId),
      Number(value),
      new Date(date)
    );
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar venda.", error });
  }
};

export const getSalesStatisticsController = async (
  req: Request,
  res: Response
) => {
  try {
    const statistics = await getSalesStatistics();
    res.status(200).json({ totalSalesByDay: statistics });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar estatísticas de vendas.", error });
  }
};

export const getTopClientsController = async (req: Request, res: Response) => {
  try {
    const topClients = await getTopClients();
    res.status(200).json(topClients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar clientes de maior destaque.", error });
  }
};
