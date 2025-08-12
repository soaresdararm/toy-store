import { Request, Response } from "express";
import {
  createSale,
  getSalesStatistics,
  getTopClients,
} from "../services/salesService";

class SalesController {
  async createSale(req: Request, res: Response) {
    try {
      const { clientId, value, date } = req.body;
      const newSale = await createSale(clientId, value, new Date(date));
      res.status(201).json(newSale);
    } catch (error) {
      res.status(500).json({ message: "Error creating sale", error });
    }
  }

  async getSalesStatistics(req: Request, res: Response) {
    try {
      const statistics = await getSalesStatistics();
      res.status(200).json(statistics);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching sales statistics", error });
    }
  }

  async getTopClients(req: Request, res: Response) {
    try {
      const topClients = await getTopClients();
      res.status(200).json(topClients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching top clients", error });
    }
  }
}

export default new SalesController();
