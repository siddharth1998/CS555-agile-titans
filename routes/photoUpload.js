import express from "express";
import multer from "multer";
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
        email: req.body.email,
        operation: req.body.operation
    });
   
    let variable= result_json._id.toString()
    await result_json.save();
    res.send(result_json.fileName);
}
);

router.get("/",upload.single('image'),async (req,res)=>{
    return res.render("PhotoInspection/createPhoto.ejs"); 
}
);

router.get("/dashboard", async (req,res)=>{

    try {
        const file = await photoUploadModel.find();
        return res.render("PhotoInspection/photoDashboard.ejs", { requests: file}); 
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
}
);

export { router };
