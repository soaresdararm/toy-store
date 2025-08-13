import { Router } from "express";
import salesController from "../controllers/salesController";
import { authenticate } from "../middlewares/authMiddleware";

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Endpoints de vendas
 */
const router = Router();

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Registrar venda
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venda registrada
 *       400:
 *         description: Dados inválidos
 */
router.post(
  "/sales",
  authenticate,
  salesController.createSale.bind(salesController)
);

/**
 * @swagger
 * /api/sales/statistics:
 *   get:
 *     summary: Estatísticas de vendas
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas retornadas
 */
router.get(
  "/sales/statistics",
  authenticate,
  salesController.getSalesStatistics.bind(salesController)
);

/**
 * @swagger
 * /api/sales/top-clients:
 *   get:
 *     summary: Top clientes por vendas
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de top clientes
 */
router.get(
  "/sales/top-clients",
  authenticate,
  salesController.getTopClients.bind(salesController)
);

export default router;
