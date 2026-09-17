class EventDTO {
    constructor(event) {
        this.id = event._id;
        this.title = event.title;
        this.description = event.description;
        this.date = event.date;
        this.capacity = event.capacity;
        this.price = event.price;
        this.category = event.category;
        this.location = event.location;
        this.organizer = this.formatOrganizer(event.organizer);
        this.status = event.status;
        this.createdAt = event.createdAt;
        this.updatedAt = event.updatedAt;
    }

    formatOrganizer(organizer) {
        if (!organizer) return null;

        // Si no está populated, devolvemos solamente el ID
        if (!organizer._id) {
            return organizer;
        }

        // Si está populated, filtramos los campos permitidos
        return {
            id: organizer._id,
            first_name: organizer.first_name,
            last_name: organizer.last_name,
            email: organizer.email,
            role: organizer.role
        };
    }
}

export { EventDTO };