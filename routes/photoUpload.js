import express, { response } from "express";
import mongoose, { isObjectIdOrHexString, ObjectId } from "mongoose";
import multer from "multer";
import { uploadFiles } from "../services/s3.js";
import { photoUploadModel } from '../models/photo.js';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split('.')[1];
        cb(null, `${Date.now()}.${extension}`);
    }
});

const upload = multer({ storage })// const multer  = require('multer')

const router = express.Router();// console.log("Reached before the router post photo upload");

router.post("/",upload.single('image'),async (req,res)=>{
    const file =req.file;
    
    const description=req.body.description;
    const result_json= new photoUploadModel({
        customerID:req.body.customerID,
        fileName:file.filename,
        content: req.body.CommentContent,
        operation: req.body.operation
    });
    console.log(result_json)
    let variable= result_json._id.toString()
    console.log(variable)
    await result_json.save();
    res.send("Hello");
}
);

export { router };
