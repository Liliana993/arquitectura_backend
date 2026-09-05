import {EventModel} from "../models/eventSchema.js";

export class EventDAO {
    //create event
    async createEvent(eventData) {
        return EventModel.create(eventData);
    }

    async findEventById(eventId) {
        return EventModel.findById(eventId);
    }

    async updateEventById(eventId, updateData) {
        return EventModel.findByIdAndUpdate(eventId, updateData, { new: true, runValidators: true }).populate('organizer', 'first_name last_name email role');
    }

    async findAllEvents(filter, { skip = 0, limit = 10, sort }) {
        return EventModel.find(filter).populate('organizer', 'first_name last_name email role').skip(skip).limit(limit).sort(sort);
    }
    
    async countEvents(filter) {
        return EventModel.countDocuments(filter);
    }
}