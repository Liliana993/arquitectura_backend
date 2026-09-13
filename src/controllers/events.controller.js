import { EventService } from '../services/event.service.js';
import { EventDTO } from '../dto/evento.dto.js';

const eventService = new EventService();

// Health Check
export const healthCheck = (req, res) => {
    try {
        res.status(200).json({
            status: "ok",
            message: "API corriendo con éxito!"
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al realizar el health check."
        });
    }
};

// Events
export const getEvents = async (req, res, next) => {
  try {
    const result = await eventService.getEvents(req.query);

    return res.status(200).json({
      status: "success",
      payload: result.data.map(event => new EventDTO(event)),
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    });
  } catch (error) {
    next(error);
  }
};

// Event by ID
export const getEventById = async (req, res, next) => {
    try {
        const event = await eventService.getEventById(req.params.id);

        return res.status(200).json({
            status: "success",
            payload: new EventDTO(event)
        });
    } catch (error) {
        next(error);
    }
};

// Create Event
export const createEvent = async (req, res, next) => {
    try {
        const event = await eventService.createEvent(
            req.body,
            req.user
        );

        res.status(201).json({
            status: 'success',
            message: 'Evento creado con éxito',
            payload: new EventDTO(event)
        });
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        const event = await eventService.updateEvent(
            req.params.id,
            req.body,
            req.user
        );

        res.json({
            status: "success",
            message: "Evento actualizado",
            data: new EventDTO(event)
        });
    } catch (error) {
        next(error);
    }
};

export const changeEventStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const event = await eventService.changeStatus(
            req.params.id,
            status,
            req.user
        );

        res.json({
            status: "success",
            message: "Estado del evento actualizado",
            data: new EventDTO(event)
        });
    } catch (error) {
        next(error);
    }
};