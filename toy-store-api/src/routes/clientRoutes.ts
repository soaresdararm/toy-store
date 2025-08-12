import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from '../controllers/clientController';

const router = Router();

router.use(authenticate);

router.post('/', createClient);

router.get('/', getClients);

router.put('/:id', updateClient);

router.delete('/:id', deleteClient);

export default router;