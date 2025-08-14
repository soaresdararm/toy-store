import { createSale as createSaleDb, getAllSales, Sale } from "../models/sale";

// Cria uma venda
export const createSale = async (
  clientId: number,
  value: number,
  date: Date
) => {
  const id = await createSaleDb({ clientId, value, date });
  return { id, clientId, value, date };
};

// Estatísticas: total de vendas por dia
export const getSalesStatistics = async () => {
  const sales = await getAllSales();
  // Agrupa por dia (YYYY-MM-DD)
  const stats: { [day: string]: number } = {};
  for (const sale of sales) {
    const day = sale.date.toISOString().slice(0, 10);
    stats[day] = (stats[day] || 0) + Number(sale.value);
  }
  return Object.entries(stats).map(([day, totalSales]) => ({
    day,
    totalSales,
  }));
};

// Cliente com maior volume de vendas, maior média e maior frequência de dias únicos
export const getTopClients = async () => {
  const sales = await getAllSales();
  if (sales.length === 0) return {};

  // Maior volume
  const volumeMap: { [clientId: number]: number } = {};
  // Média
  const avgMap: { [clientId: number]: { total: number; count: number } } = {};
  // Frequência de dias únicos
  const freqMap: { [clientId: number]: Set<string> } = {};

  for (const sale of sales) {
    // Volume
    volumeMap[sale.clientId] =
      (volumeMap[sale.clientId] || 0) + Number(sale.value);
    // Média
    if (!avgMap[sale.clientId]) avgMap[sale.clientId] = { total: 0, count: 0 };
    avgMap[sale.clientId].total += Number(sale.value);
    avgMap[sale.clientId].count += 1;
    // Frequência
    const day = sale.date.toISOString().slice(0, 10);
    if (!freqMap[sale.clientId]) freqMap[sale.clientId] = new Set();
    freqMap[sale.clientId].add(day);
  }

  // Top volume
  let topVolumeClient = null;
  let maxVolume = -Infinity;
  for (const [clientId, total] of Object.entries(volumeMap)) {
    if (total > maxVolume) {
      maxVolume = total;
      topVolumeClient = { clientId: Number(clientId), totalValue: total };
    }
  }

  // Top média
  let topAverageClient = null;
  let maxAvg = -Infinity;
  for (const [clientId, { total, count }] of Object.entries(avgMap)) {
    const avg = total / count;
    if (avg > maxAvg) {
      maxAvg = avg;
      topAverageClient = { clientId: Number(clientId), averageValue: avg };
    }
  }

  // Top frequência
  let topFrequencyClient = null;
  let maxFreq = -Infinity;
  for (const [clientId, days] of Object.entries(freqMap)) {
    const freq = (days as Set<string>).size;
    if (freq > maxFreq) {
      maxFreq = freq;
      topFrequencyClient = { clientId: Number(clientId), uniqueDays: freq };
    }
  }

  return {
    topVolumeClient,
    topAverageClient,
    topFrequencyClient,
  };
};
