import {TicketModel} from '../models/ticketSchema.js';

export class TicketDao {
    async createTicket(ticketData) {
        return await TicketModel.create(ticketData);
    }

    async findTicketById(ticketId) {
        return await TicketModel.findById(ticketId).populate('user', "first_name last_name email role").populate('event', "title description category date location capacity price status organizer");
    }

    async findByUserAndEvent(userId, eventId) {
        return await TicketModel.findOne({ user: userId, event: eventId, status: 'active' });
    }

    async updateById(ticketId, updateData) {
        return await TicketModel.findByIdAndUpdate(ticketId, updateData, { new: true,
        runValidators: true }).populate("user", "first_name last_name email role")
      .populate("event", "title description category date location capacity price status organizer");;
    }

    async findAllTickets(filter, { skip, limit, sort }) {
        return await TicketModel.find(filter).populate("user", "first_name last_name email role").populate("event", "title description category date location capacity price status organizer").sort(sort).skip(skip).limit(limit);
    }

    async countTickets(filter) {
        return await TicketModel.countDocuments(filter);
    }

    async getReservedTicketsCount(eventId) {
        const result = await TicketModel.aggregate([
          { $match: { event: eventId, status: "active" } },
          { $group: { _id: "$event", totalReserved: { $sum: "$quantity" } } }
        ]);
     return result[0]?.totalReserved || 0;
    }
}