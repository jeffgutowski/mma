import express from 'express';
import { createFighter, getFighters } from '../controllers/fighterController.js';
import upload from '../utils/multer.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, upload.single('image'), createFighter)
  .get(getFighters);

export default router;