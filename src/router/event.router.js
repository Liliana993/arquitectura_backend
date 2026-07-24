import { Router } from 'express';
import { getEvent } from '../controllers/event.controller.js';

const router = Router();

router.get('/', getEvent);

export default router;