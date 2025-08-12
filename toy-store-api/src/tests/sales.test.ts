import request from 'supertest';
import app from '../app'; // Importa a aplicação Express
import { connectDB, disconnectDB } from '../utils/db'; // Funções para conectar e desconectar do banco de dados
import Sale from '../models/sale'; // Modelo de venda

describe('Sales API', () => {
  beforeAll(async () => {
    await connectDB(); // Conecta ao banco de dados antes dos testes
  });

  afterAll(async () => {
    await disconnectDB(); // Desconecta do banco de dados após os testes
  });

  beforeEach(async () => {
    await Sale.deleteMany({}); // Limpa a coleção de vendas antes de cada teste
  });

  it('should create a sale', async () => {
    const response = await request(app)
      .post('/api/sales')
      .send({
        clientId: 'clientId123',
        valor: 100,
        data: '2024-01-01',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Sale created successfully');
  });

  it('should retrieve sales statistics', async () => {
    await Sale.create({
      clientId: 'clientId123',
      valor: 100,
      data: '2024-01-01',
    });

    const response = await request(app).get('/api/sales/statistics');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalSalesByDay');
  });

  it('should return the client with the highest sales volume', async () => {
    await Sale.create({
      clientId: 'clientId123',
      valor: 100,
      data: '2024-01-01',
    });
    await Sale.create({
      clientId: 'clientId456',
      valor: 200,
      data: '2024-01-01',
    });

    const response = await request(app).get('/api/sales/statistics/highest-volume-client');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clientId', 'clientId456');
  });

  it('should return the client with the highest average sale value', async () => {
    await Sale.create({
      clientId: 'clientId123',
      valor: 100,
      data: '2024-01-01',
    });
    await Sale.create({
      clientId: 'clientId123',
      valor: 300,
      data: '2024-01-02',
    });

    const response = await request(app).get('/api/sales/statistics/highest-average-client');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clientId', 'clientId123');
  });

  it('should return the client with the highest frequency of purchases', async () => {
    await Sale.create({
      clientId: 'clientId123',
      valor: 100,
      data: '2024-01-01',
    });
    await Sale.create({
      clientId: 'clientId123',
      valor: 150,
      data: '2024-01-02',
    });
    await Sale.create({
      clientId: 'clientId456',
      valor: 200,
      data: '2024-01-01',
    });

    const response = await request(app).get('/api/sales/statistics/highest-frequency-client');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clientId', 'clientId123');
  });
});