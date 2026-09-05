import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    }, 
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status:{
        type: String,
        enum: ['draft', 'published', 'cancelled', 'finished'],
        default: 'draft'
    }
},
{
    timestamps: true
}
);

export const EventModel = mongoose.model('event', eventSchema);