import request from "supertest";
import expressApp from "../app";
import { deleteSale, getAllSales } from "../models/sale";

describe("Sales API", () => {
  let token: string;
  let clientId1: number;
  let clientId2: number;

  beforeAll(async () => {
    const email = `testuser_sales_${Date.now()}@example.com`;
    const password = "testpassword";
    await request(expressApp)
      .post("/api/auth/register")
      .send({ email, password });
    const loginRes = await request(expressApp)
      .post("/api/auth/login")
      .send({ email, password });
    token = loginRes.body.token;

    const res1 = await request(expressApp)
      .post("/api/clients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nomeCompleto: "Cliente 1",
        email: `cliente1_${Date.now()}@example.com`,
        nascimento: "1990-01-01",
      });
    clientId1 = res1.body.id;
    const res2 = await request(expressApp)
      .post("/api/clients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nomeCompleto: "Cliente 2",
        email: `cliente2_${Date.now()}@example.com`,
        nascimento: "1991-01-01",
      });
    clientId2 = res2.body.id;

    const vendas = await getAllSales();
    for (const v of vendas) {
      if (v.id) await deleteSale(v.id);
    }
  });

  afterAll(async () => {
    const vendas = await getAllSales();
    for (const v of vendas) {
      if (v.id) await deleteSale(v.id);
    }
  });

  beforeEach(async () => {
    const vendas = await getAllSales();
    for (const v of vendas) {
      if (v.id) await deleteSale(v.id);
    }
  });

  it("should create a sale", async () => {
    const response = await request(expressApp)
      .post("/api/sales")
      .set("Authorization", `Bearer ${token}`)
      .send({
        clientId: clientId1,
        value: 100,
        date: "2024-01-01",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("clientId", clientId1);
    expect(response.body).toHaveProperty("value", 100);
  });

  it("should retrieve sales statistics", async () => {
    await request(expressApp)
      .post("/api/sales")
      .set("Authorization", `Bearer ${token}`)
      .send({
        clientId: clientId1,
        value: 100,
        date: "2024-01-01",
      });

    const response = await request(expressApp)
      .get("/api/sales/statistics")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalSalesByDay");
    expect(Array.isArray(response.body.totalSalesByDay)).toBe(true);
  });

  it("should return the top clients", async () => {
    await request(expressApp)
      .post("/api/sales")
      .set("Authorization", `Bearer ${token}`)
      .send({
        clientId: clientId1,
        value: 100,
        date: "2024-01-01",
      });
    await request(expressApp)
      .post("/api/sales")
      .set("Authorization", `Bearer ${token}`)
      .send({
        clientId: clientId2,
        value: 200,
        date: "2024-01-01",
      });

    const response = await request(expressApp)
      .get("/api/sales/top-clients")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("topVolumeClient");
    expect(response.body).toHaveProperty("topAverageClient");
    expect(response.body).toHaveProperty("topFrequencyClient");
  });

});
