import request from "supertest";
import expressApp from "../app";
import { deleteClient, getAllClients } from "../models/client";

describe("Client API", () => {
  let clientId: number;
  let token: string;

  beforeAll(async () => {
    const email = `testuser_${Date.now()}@example.com`;
    const password = "testpassword";
    await request(expressApp)
      .post("/api/auth/register")
      .send({ email, password });
    const loginRes = await request(expressApp)
      .post("/api/auth/login")
      .send({ email, password });
    token = loginRes.body.token;
    const clientes = await getAllClients();
    for (const c of clientes) {
      if (c.id) await deleteClient(c.id);
    }
  });

  afterAll(async () => {
    const clientes = await getAllClients();
    for (const c of clientes) {
      if (c.id) await deleteClient(c.id);
    }
  });

  it("should create a new client", async () => {
    const response = await request(expressApp)
      .post("/api/clients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nomeCompleto: "Ana Beatriz",
        email: "ana.b@example.com",
        nascimento: "1992-05-01",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    clientId = response.body.id; 
  });

  it("should list all clients", async () => {
    const response = await request(expressApp)
      .get("/api/clients")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("clientes");
    expect(response.body.clientes.length).toBeGreaterThan(0);
  });

  it("should update a client", async () => {
    const response = await request(expressApp)
      .put(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ana Beatriz Silva",
        email: "ana.b.silva@example.com",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("nomeCompleto", "Ana Beatriz Silva");
  });

  it("should delete a client", async () => {
    const response = await request(expressApp)
      .delete(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existing client", async () => {
    const response = await request(expressApp)
      .get(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
