import { EventModel } from "../models/eventSchema.js";

export class EventDAO {

  // Crear evento
  async createEvent(eventData) {
    return EventModel.create(eventData);
  }

  // Buscar evento por ID
  async findEventById(eventId) {
    return EventModel.findById(eventId)
      .populate("organizer", "first_name last_name email role");
  }

  // Actualizar evento
  async updateEventById(eventId, updateData) {
    return EventModel.findByIdAndUpdate(
      eventId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate(
      "organizer",
      "first_name last_name email role"
    );
  }

  // Obtener eventos
  async findAllEvents(
    filter,
    { skip = 0, limit = 10, sort }
  ) {
    return EventModel.find(filter)
      .populate(
        "organizer",
        "first_name last_name email role"
      )
      .skip(skip)
      .limit(limit)
      .sort(sort);
  }

  // Contar eventos
  async countEvents(filter) {
    return EventModel.countDocuments(filter);
  }
}