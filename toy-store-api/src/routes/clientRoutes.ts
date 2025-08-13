import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "../controllers/clientController";

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Endpoints de clientes
 */
const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Cadastrar cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado
 *       400:
 *         description: Dados inválidos
 */
router.post("/", createClient);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Listar clientes
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get("/", getClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualizar cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *       404:
 *         description: Cliente não encontrado
 */
router.put("/:id", updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Remover cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cliente removido
 *       404:
 *         description: Cliente não encontrado
 */
router.delete("/:id", deleteClient);

export default router;
