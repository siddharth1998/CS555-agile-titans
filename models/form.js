import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    priority: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });


const ticketModel = mongoose.model('ticket', ticketSchema, 'ticket');

export { ticketModel };