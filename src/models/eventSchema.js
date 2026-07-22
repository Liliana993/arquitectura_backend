import moongose from "mongoose";

const eventSchema = new moongose.Schema({
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
    }
},
{
    timestamps: true
}
);

export const EventModel = moongose.model('event', eventSchema);