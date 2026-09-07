import {TicketDao} from '../dao/ticket.dao.js';

export class TicketRepository {
    constructor() {
        this.ticketDao = new TicketDao();
    }

    createTicket(ticketData) {
        return this.ticketDao.createTicket(ticketData);
    }

    findTicketById(ticketId) {
        return this.ticketDao.findTicketById(ticketId);
    }

    findByUserAndEvent(userId, eventId) {
        return this.ticketDao.findByUserAndEvent(userId, eventId);
    }

    updateById(ticketId, updateData) {
        return this.ticketDao.updateById(ticketId, updateData);
    }

    findAllTickets(filter, pagination) {
        return this.ticketDao.findAllTickets(filter, pagination);
    }

    countTickets(filter) {
        return this.ticketDao.countTickets(filter);
    }

    getReservedTicketsCount(eventId) {
        return this.ticketDao.getReservedTicketsCount(eventId);
    }
}    