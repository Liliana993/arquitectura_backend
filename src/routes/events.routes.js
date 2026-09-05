import { Router } from 'express';
import { createEvent, getEvents, healthCheck, getEventById, updateEvent, changeEventStatus,  } from '../controllers/events.controller.js';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';

const router = Router();

router.get('/health', healthCheck); // Health Check => para verificar que la API esté corriendo correctamente

// Consultar eventos publicados
// Público: user, organizer y admin
router.get('/', getEvents); // Events => traer todos los eventos
router.get('/:id', getEventById); // Event by ID => traer un evento por su ID
// Crear evento
// Solo organizer y admin
router.post('/', passport.authenticate('current', {session: false}), authorizeRoles('admin', 'organizer') ,createEvent); // Create Event => crear un nuevo evento sin persistencia en la base de datos.
// Actualizar evento
// Solo organizer y admin
router.put('/:id', passport.authenticate('current', {session: false}), authorizeRoles('admin', 'organizer') ,updateEvent); // Update Event => actualizar un evento existente
// Cambiar estado del evento
// Solo organizer y admin
router.patch('/:id/status', passport.authenticate('current', {session: false}), authorizeRoles('admin', 'organizer') ,changeEventStatus); // Change Event Status => cambiar el estado de un evento existente

export default router;