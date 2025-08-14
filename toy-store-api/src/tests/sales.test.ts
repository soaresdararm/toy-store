import request from "supertest";
import expressApp from "../app";
import { deleteSale, getAllSales } from "../models/sale";

describe("Sales API", () => {
  beforeAll(async () => {
    // Limpa todas as vendas antes dos testes
    const vendas = await getAllSales();
    for (const v of vendas) {
      if (v.id) await deleteSale(v.id);
    }
  });

  afterAll(async () => {
    // Limpa todas as vendas após os testes
    const vendas = await getAllSales();
    for (const v of vendas) {
      if (v.id) await deleteSale(v.id);
    }
  });

  beforeEach(async () => {
    // Limpa todas as vendas antes de cada teste
    const vendas = await getAllSales();
    for (const v of vendas) {
      if (v.id) await deleteSale(v.id);
    }
  });

  it("should create a sale", async () => {
    const response = await request(expressApp).post("/api/sales").send({
      clientId: 1,
      value: 100,
      date: "2024-01-01",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("clientId", 1);
    expect(response.body).toHaveProperty("value", 100);
  });

  it("should retrieve sales statistics", async () => {
    await request(expressApp).post("/api/sales").send({
      clientId: 1,
      value: 100,
      date: "2024-01-01",
    });

    const response = await request(expressApp).get("/api/sales/statistics");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalSalesByDay");
    expect(Array.isArray(response.body.totalSalesByDay)).toBe(true);
  });

  it("should return the top clients", async () => {
    await request(expressApp).post("/api/sales").send({
      clientId: 1,
      value: 100,
      date: "2024-01-01",
    });
    await request(expressApp).post("/api/sales").send({
      clientId: 2,
      value: 200,
      date: "2024-01-01",
    });

    const response = await request(expressApp).get("/api/sales/top-clients");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("topVolumeClient");
    expect(response.body).toHaveProperty("topAverageClient");
    expect(response.body).toHaveProperty("topFrequencyClient");
  });

  // Os endpoints de highest-average-client e highest-frequency-client foram removidos.
});
