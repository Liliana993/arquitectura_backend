class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id;
        this.status = ticket.status;
        this.quantity = ticket.quantity;
        this.code = ticket.code;
        this.cancelledAt = ticket.cancelledAt;
        this.createdAt = ticket.createdAt;
        this.updatedAt = ticket.updatedAt;

        this.user = this.formatUser(ticket.user);
        this.event = this.formatEvent(ticket.event);
    }

    formatUser(user) {
        if (!user) return null;

        if (!user._id) {
            return user;
        }

        return {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        };
    }

    formatEvent(event) {
        if (!event) return null;

        if (!event._id) {
            return event;
        }

        return {
            id: event._id,
            title: event.title,
            description: event.description,
            date: event.date,
            capacity: event.capacity,
            price: event.price,
            status: event.status
        };
    }
}

export { TicketDTO };