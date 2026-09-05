import { EventDAO } from '../dao/event.dao.js';

export class EventRepository {
    constructor() {
        this.eventDAO = new EventDAO();
    }

    createEvent(eventData) {
        return this.eventDAO.createEvent(eventData);
    }

    findEventById(eventId) {
        return this.eventDAO.findEventById(eventId);
    }

    updateEventById(eventId, updateData) {
        return this.eventDAO.updateEventById(eventId, updateData);
    }

    findAllEvents(filter, options) {
        return this.eventDAO.findAllEvents(filter, options);
    }

    countEvents(filter) {
        return this.eventDAO.countEvents(filter);
    }
}