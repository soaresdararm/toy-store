import Sale from "../models/sale";
import { Op, fn, col, literal } from "sequelize";

// Cria uma venda
export const createSale = async (
  clientId: number,
  value: number,
  date: Date
) => {
  return Sale.create({ clientId, value, date });
};

// Estatísticas: total de vendas por dia
export const getSalesStatistics = async () => {
  return Sale.findAll({
    attributes: [
      [fn("substr", col("date"), 1, 10), "day"],
      [fn("SUM", col("value")), "totalSales"],
    ],
    group: [fn("substr", col("date"), 1, 10)],
    order: [[literal("day"), "ASC"]],
    raw: true,
  });
};

// Cliente com maior volume de vendas, maior média e maior frequência de dias únicos
export const getTopClients = async () => {
  const [topVolume] = await Sale.findAll({
    attributes: ["clientId", [fn("SUM", col("value")), "totalValue"]],
    group: ["clientId"],
    order: [[literal("totalValue"), "DESC"]],
    limit: 1,
    raw: true,
  });

  // Maior média de valor por venda
  const [topAverage] = await Sale.findAll({
    attributes: ["clientId", [fn("AVG", col("value")), "averageValue"]],
    group: ["clientId"],
    order: [[literal("averageValue"), "DESC"]],
    limit: 1,
    raw: true,
  });

  // Maior frequência de dias únicos com vendas
  const [topFrequency] = await Sale.findAll({
    attributes: [
      "clientId",
      [
        fn("COUNT", fn("DISTINCT", fn("substr", col("date"), 1, 10))),
        "uniqueDays",
      ],
    ],
    group: ["clientId"],
    order: [[literal("uniqueDays"), "DESC"]],
    limit: 1,
    raw: true,
  });

  return {
    topVolumeClient: topVolume,
    topAverageClient: topAverage,
    topFrequencyClient: topFrequency,
  };
};
