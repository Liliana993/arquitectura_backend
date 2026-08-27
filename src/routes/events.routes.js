import { Router } from 'express';
import { createEvent, getEvents, healthCheck } from '../controllers/events.controller.js';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';

const router = Router();

router.get('/health', healthCheck); // Health Check => para verificar que la API esté corriendo correctamente

// Consultar eventos publicados
// Público: user, organizer y admin
router.get('/', getEvents); // Events => traer todos los eventos

// Crear evento
// Solo organizer y admin
router.post('/', passport.authenticate('current', {session: false}), authorizeRoles('admin', 'organizer') ,createEvent); // Create Event => crear un nuevo evento sin persistencia en la base de datos.

export default router;