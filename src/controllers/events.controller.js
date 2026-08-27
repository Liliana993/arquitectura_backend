import { EventModel } from '../models/eventSchema.js';

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
export const getEvents = async (req, res) => {
    try {

        const events = await EventModel.find();

        return res.status(200).json({
            status: "success",
            payload: events
        });

    } catch (error) {

        console.error("❌ Error al obtener los eventos:", error);

        return res.status(500).json({
            status: "error",
            message: "Error al obtener los eventos."
        });
    }
};

// Create Event => crear un nuevo evento sin persistencia en la base de datos aún.
export const createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        const event = await EventModel.create({
            title,
            description,
            date,
            organizer: req.user._id
        });

        return res.status(201).json({
            status: 'success',
            payload: {
                id: event._id,
                title: event.title,
                organizer: event.organizer
            }
        });

    } catch (error) {
        console.error('❌ Error creating event:', error);

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};