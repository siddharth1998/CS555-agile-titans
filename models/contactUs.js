import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    fullName: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const contactUsModel = mongoose.model('contactUs', contactUsSchema, 'contactUs');

export { contactUsModel };