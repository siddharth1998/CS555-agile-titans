import * as path from 'path';
import { fileURLToPath } from 'url'
import jwt from "jsonwebtoken";
import * as fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const privateKey = fs.readFileSync(path.join(__dirname, '..', 'jwt_signing_key'));

const getAuthToken = payload => jwt.sign(payload, privateKey, { expiresIn: '1d' });

const validate = (req, res, next) => {
    const token = req.header("Auth");

    if (!token) return res.status(401).json({ status: "error", message: "Unauthorized" });

    try {
        req.user = jwt.verify(token, privateKey);
        next();
    } catch (err) { return res.status(401).json({ status: "error", message: "Unauthorized" }); }
};

export { getAuthToken, validate };
