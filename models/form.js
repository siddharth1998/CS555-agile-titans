import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });


const ticketModel = mongoose.model('ticket', ticketSchema, 'ticket');

export { ticketModel };