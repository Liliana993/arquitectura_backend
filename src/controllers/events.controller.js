import { EventService } from '../services/event.service.js';

const eventService = new EventService();

// Health Check => para verificar que la API esté corriendo correctamente
export const healthCheck = (req, res) => {
    try{
        res.status(200).json({
            status: "ok",
            message: "API corriendo con éxito!"
        });
    }catch(error){
        res.status(500).json({
          error: "Error al realizar el health check."
        })
    }
}

// Events => traer todos los eventos
export const getEvents = async (req, res, next) => {
    try {

        const events = await eventService.getEvents(req.query);

        return res.status(200).json({
            status: "success",
            payload: events
        });

    } catch (error) {

        next(error);
    }
};

//Event by ID => traer un evento por su ID
export const getEventById = async (req, res, next) => {
    try {
        const event = await eventService.getEventById(req.params.id);

        return res.status(200).json({
            status: "success",
            payload: event
        });
    } catch (error) {
        next(error);
    }
};

// Create Event => crear un nuevo evento sin persistencia en la base de datos aún.
export const createEvent = async (req, res, next) => {
    try {
        const event = await eventService.createEvent(req.body, req.user);

        res.status(201).json({
            status: 'success',
            message: 'Evento creado con éxito',
            payload: event
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
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const changeEventStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: "error",
        message: "El campo status es obligatorio"
      });
    }

    const event = await eventService.changeStatus(
      req.params.id,
      status,
      req.user
    );

    res.json({
      status: "success",
      message: "Estado del evento actualizado",
      data: event
    });
  } catch (error) {
    next(error);
  }
};
