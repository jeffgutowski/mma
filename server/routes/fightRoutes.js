import express from 'express';
import { createFight, getFights, voteFight } from '../controllers/fightController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createFight)
  .get(getFights);

router.post('/vote', protect, voteFight);

export default router;