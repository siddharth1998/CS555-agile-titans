import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        this.password = await bcrypt.hash(this.password, (await bcrypt.genSalt(10)));;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (password) { return (await bcrypt.compare(password, this.password)) };

const userModel = mongoose.model('user', userSchema, 'user');

export { userModel };