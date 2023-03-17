import express from "express";
import multer from "multer";
import { uploadFiles } from "../services/s3.js";

// const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



const router = express.Router();
// console.log("Reached before the router post photo upload");
router.post("/",upload.single('image'),async (req,res)=>{
    const file =req.file;
    console.log(file);
    await uploadFiles(file)
    const description=req.body.description;
    console.log("reached here");
    res.send("Hello World");
}
);

export { router };
