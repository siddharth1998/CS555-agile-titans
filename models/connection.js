import mongoose from "mongoose";
import { MONGO_URL } from "../config.js";

try {
    await mongoose.connect(MONGO_URL);
} catch (err) {
    console.error(`Error while connecting to mongo db : ${err.message}`);
    console.error(err);
}
