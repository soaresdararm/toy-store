import { Router } from "express";
import salesController from "../controllers/salesController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/sales",
  authenticate,
  salesController.createSale.bind(salesController)
);
router.get(
  "/sales/statistics",
  authenticate,
  salesController.getSalesStatistics.bind(salesController)
);
router.get(
  "/sales/top-clients",
  authenticate,
  salesController.getTopClients.bind(salesController)
);

export default router;
