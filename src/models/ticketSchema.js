import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active'
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    code: {
      type: String,
      unique: true
    },
    cancelledAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

export const TicketModel = mongoose.model('Ticket', ticketSchema)