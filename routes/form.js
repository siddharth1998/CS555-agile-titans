import { ticketModel } from "../models/form.js"; 
import express from "express";
import {ObjectId} from 'mongodb';

const router = express.Router();
const create = ticket => new ticketModel(ticket).save();

router.get("/", async (req, res) => {
    try {
        return res.render("Ticket/createTicket.ejs")
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: err.message });
    }
});

router.post("/issue", async (req, res) => {
    try {
        if (!req.body)
        res
            .status(400)
            .json({ status: "error", message: "No ticket details are sent" });

        const form = req.body;
        let ticket = await create(form);
        const tickets = await ticketModel.find();

        return res
        .status(201)
        .render("Ticket/ticket.ejs", {requests: tickets, message: "Ticket Created Succesfully !"});
    } catch (err) {
        console.error(`Error while creating a new ticket`);
        console.error(err);
        return res.status(500).json({ status: "error", message: err.message });
    }
});

router.get("/ticketDashboard", async (req, res) => {
    try {
        const tickets = await ticketModel.find();
        return res.render("Ticket/ticket.ejs", { requests: tickets, message: ""}); 
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
});

router.get("/ticketChangeDashboard", async (req, res) => {
    try {
        const tickets = await ticketModel.find();
        return res.render("Ticket/changeTicket.ejs", { requests: tickets}); 
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
});

router.post("/ticketChangeDashboard", async (req, res) => {
    // return console.log(req.body)
    try {
        for (let i = 0; i < req.body.status.length; i++) {

            var id = req.body.no[i]
            var status = req.body.status[i]

            await ticketModel.findOneAndUpdate({ _id: new ObjectId(id) }, { status: status });
        }
        const tickets = await ticketModel.find();
 
        return res.render("Ticket/ticket.ejs", { requests: tickets, message: ""}); 
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
});

export { router }