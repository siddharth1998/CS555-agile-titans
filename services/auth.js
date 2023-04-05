import * as path from 'path';
import { fileURLToPath } from 'url'
import jwt from "jsonwebtoken";
import * as fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let privateKey;
try {
    privateKey = fs.readFileSync(path.join(__dirname, '..', 'jwt_signing_key'));
} catch (err) {
    privateKey = process.env.jwt_signing_key;

    if (!privateKey) throw "Error: JWT Signing Key is not found";
}

const getAuthToken = payload => jwt.sign(payload, privateKey, { expiresIn: '1d' });

const validate = (req, res, next) => {
    const token = req.header("Auth") || req.cookies["Auth"];

    if (!token && req.url.includes("api/")) return res.status(401).json({ status: "error", message: "Unauthorized" });

    if (!token && !req.url.includes("api/")) return res.redirect("/");

    try {
        req.user = jwt.verify(token, privateKey);
        next();
    } catch (err) { 
        return req.url.includes("api/") ? res.status(401).json({ status: "error", message: "Unauthorized" }) : res.redirect("/"); 
    }
};

export { getAuthToken, validate };
