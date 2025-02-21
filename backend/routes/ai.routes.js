import express from 'express';
import { analyze } from '../controllers/ai.controller.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/analyze', analyze)

export default router;