import { Router } from "express";
import { getAll } from "../services/user.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        /** Fot testing purposes I am printing all the users on dashboard */
        let users = await getAll();

        return res.render('Dashboard/Dashboard.ejs', { users });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Uh! Oh Something went wrong on our side, we will fix it :)" });
    }
});

export default router;
