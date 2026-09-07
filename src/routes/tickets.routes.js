import { Router } from "express";

import {
  createTicket,
  getTicketById,
  getTickets,
  getMyTickets,
  cancelTicket
} from "../controllers/tickets.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const router = Router();

// Autenticado - ver mis tickets (debe ir antes de /:id)
router.get("/my/tickets", authMiddleware, getMyTickets);

// Público
router.get("/", getTickets);
router.get("/:id", getTicketById);

// Usuario autenticado - crear ticket
router.post(
  "/",
  authMiddleware,
  authorizeRoles("user", "organizer", "admin"),
  createTicket
);

// Dueño del ticket o admin - cancelar ticket
router.patch(
  "/:id/cancel",
  authMiddleware,
  authorizeRoles("user", "organizer", "admin"),
  cancelTicket
);

export default router;