import express from "express";
import { create, validate } from "../services/user.js";

const router = express.Router();

/** /user/signup  */
router.post("/signup", async (req, res) => {
    try {
        if (!req.body) res.status(400).json({ status : 'error', message : "No user details are sent" });

        let user = await create(req.body);// user payload
        return res.status(201).json({ status: 'success', message: 'user created successfully', user });
    } catch (err) {
        console.error(`Error while creating a new user`);
		console.error(err);
        return res.status(500).json({ status : 'error', message : err.message });
    }
});

/** /user/login */
router.post("/login", async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ status : 'error', message : "No user details are sent" });

        if (!req.body.email) return res.status(400).json({ status : 'error', message : "Email is required" });

        if (!req.body.password) return res.status(400).json({ status : 'error', message : "Password is required" });

        let valid = await validate(req.body.email, req.body.password);

        if (valid) return res.status(200).json({ status: 'success', message: 'user logged in successfully' });
        return res.status(401).json({ status : 'error', message : 'Invalid Credentials' });
    } catch (err) {
        console.error(`Error while logging user`);
		console.error(err);
        return res.status(500).json({ status : 'error', message : err });
    }
});

export { router };