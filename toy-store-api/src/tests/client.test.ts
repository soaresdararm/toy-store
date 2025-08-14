import request from "supertest";
import expressApp from "../app";
import { deleteClient, getAllClients } from "../models/client";

describe("Client API", () => {
  let clientId: number;

  beforeAll(async () => {
    // Limpa todos os clientes antes dos testes
    const clientes = await getAllClients();
    for (const c of clientes) {
      if (c.id) await deleteClient(c.id);
    }
  });

  afterAll(async () => {
    // Limpa todos os clientes após os testes
    const clientes = await getAllClients();
    for (const c of clientes) {
      if (c.id) await deleteClient(c.id);
    }
  });

  it("should create a new client", async () => {
    const response = await request(expressApp).post("/api/clients").send({
      nomeCompleto: "Ana Beatriz",
      email: "ana.b@example.com",
      nascimento: "1992-05-01",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    clientId = response.body.id; // Armazena o ID do cliente criado
  });

  it("should list all clients", async () => {
    const response = await request(expressApp).get("/api/clients");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("clientes");
    expect(response.body.clientes.length).toBeGreaterThan(0);
  });

  it("should update a client", async () => {
    const response = await request(expressApp)
      .put(`/api/clients/${clientId}`)
      .send({
        nomeCompleto: "Ana Beatriz Silva",
        email: "ana.b.silva@example.com",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("nomeCompleto", "Ana Beatriz Silva");
  });

  it("should delete a client", async () => {
    const response = await request(expressApp).delete(
      `/api/clients/${clientId}`
    );

    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existing client", async () => {
    const response = await request(expressApp).get(`/api/clients/${clientId}`);

    expect(response.status).toBe(404);
  });
});
