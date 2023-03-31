import { ticketModel } from "../models/form.js"; 
import express from "express";

const router = express.Router();
const create = ticket => new ticketModel(ticket).save();


router.post("/issue", async (req, res) => {
    try {
        if (!req.body)
        res
            .status(400)
            .json({ status: "error", message: "No ticket details are sent" });

        const form = req.body;
        let ticket = await create(form);
        return res
        .status(201)
        .json({ status: "success", message: "ticket created successfully", ticket });
    } catch (err) {
        console.error(`Error while creating a new ticket`);
        console.error(err);
        return res.status(500).json({ status: "error", message: err.message });
    }
});

export { router }