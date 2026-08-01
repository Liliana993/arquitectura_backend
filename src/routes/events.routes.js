import { Router } from 'express';
import { createEvent, getEvents, healthCheck } from '../controllers/events.controller.js';

const router = Router();

router.get('/health', healthCheck); // Health Check => para verificar que la API esté corriendo correctamente
router.get('/', getEvents); // Events => traer todos los eventos
router.post('/', createEvent); // Create Event => crear un nuevo evento sin persistencia en la base de datos.

export default router;