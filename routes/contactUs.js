import { create, getAll } from "../services/contactUs.js";
import { isValidString } from "../services/helpers.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (!req.body || (Object.keys(req.body).length === 0)) return res.status(400).json({ status: "error", message: "No details are sent" });
        let { email, name, message } = req.body;

        if (!isValidString(name)) return res.status(400).json({ status: "error", message: "Invalid Name" });

        if (!isValidString(email)) return res.status(400).json({ status: "error", message: "Invalid Email" });

        if (!isValidString(message)) return res.status(400).json({ status: "error", message: "Invalid Message" });

        await create(req.body);
        return res.status(201).json({ status: "success", message: "Request submitted successfully" });
    } catch (err) {
        console.error("Error while creating a new contactUs request");
        console.error(err);
        if (err.message.includes("duplicate key error collection") && err.message.includes("email")) return res.status(400).json({ status: "error", message: "You have already submitted a request." });
        return res.status(500).json({ status: "error", message: "Uh! Oh Something went wrong on our side, we will fix it :)" });
    }
});

router.get("/", async (req, res) => {
    try {
        let contactUsRequests = await getAll();
        
        for (let i = 0; i < contactUsRequests.length; i++) {
            contactUsRequests[i].status = contactUsRequests[i].status ? "Done" : "Pending";
        }
        return res.render("Salesperson/salesperson.ejs", { requests: contactUsRequests });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Uh! Oh Something went wrong on our side, we will fix it :)" });
    }
});

export { router };