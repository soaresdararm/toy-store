import request from 'supertest';
import app from '../app'; // Importa a aplicação Express
import { Client } from '../models/client'; // Importa o modelo de cliente

describe('Client API', () => {
  let clientId;

  beforeAll(async () => {
    // Limpa a coleção de clientes antes dos testes
    await Client.deleteMany({});
  });

  afterAll(async () => {
    // Fecha a conexão com o banco de dados após os testes
    await Client.deleteMany({});
  });

  it('should create a new client', async () => {
    const response = await request(app)
      .post('/api/clients')
      .send({
        nomeCompleto: 'Ana Beatriz',
        email: 'ana.b@example.com',
        nascimento: '1992-05-01',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    clientId = response.body.id; // Armazena o ID do cliente criado
  });

  it('should list all clients', async () => {
    const response = await request(app).get('/api/clients');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clientes');
    expect(response.body.clientes.length).toBeGreaterThan(0);
  });

  it('should update a client', async () => {
    const response = await request(app)
      .put(`/api/clients/${clientId}`)
      .send({
        nomeCompleto: 'Ana Beatriz Silva',
        email: 'ana.b.silva@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nomeCompleto', 'Ana Beatriz Silva');
  });

  it('should delete a client', async () => {
    const response = await request(app).delete(`/api/clients/${clientId}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 for non-existing client', async () => {
    const response = await request(app).get(`/api/clients/${clientId}`);

    expect(response.status).toBe(404);
  });
});