import express from "express";
import multer from "multer";
import { photoUploadModel } from '../models/photo.js';
import {ObjectId} from 'mongodb';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        if (!req.count) req.count = 1;

        let extension = file.originalname.split('.')[1];
        req.count++;
        return cb(null, `${Date.now()}${req.count}.${extension}`);
    }
});

const upload = multer({ storage })// const multer  = require('multer')

const router = express.Router();// console.log("Reached before the router post photo upload");

router.post("/", upload.array('imageFile', 20), async (req, res) => {
    const file = req.files;

    let fileNames = req.files.map(f => f.filename);

    const result_json = new photoUploadModel({
        customerID: req.body.customerId,
        fileNames: fileNames,
        content: req.body.comment,
        email: req.body.email,
        operation: req.body.operation,
        status: false,
    });

    let variable = result_json._id.toString()
    await result_json.save();
    return res.redirect("photoUpload/dashboard");
}
);

router.get('/updateStatusImage/:id/:status', async (req, res) => {
    if (!req.params.id) {
        return res.redirect("photoUpload/dashboard");
    }
    
    let id = req.params.id;
    let status = req.params.status;

    const file = await photoUploadModel.findOneAndUpdate({ _id: new ObjectId(id) }, { status: status });
    const files = await photoUploadModel.find();
    
    return res.render("PhotoInspection/photoDashboard.ejs", { requests: files });
})

router.get("/changeStatus/:id", async (req, res) => {
    if (!req.params.id) {
        return res.redirect("photoUpload/dashboard");
    }

    let caseId = req.params.id;
    const file = await photoUploadModel.find({ _id: caseId });

    if (caseId) return res.render('PhotoInspection/changePhoto.ejs', { requests: file });

    return res.render("PhotoInspection/create")
})

router.get("/", upload.single('image'), async (req, res) => {
    return res.render("PhotoInspection/createPhoto.ejs");
}
);

router.get("/dashboard", async (req, res) => {

    try {
        const file = await photoUploadModel.find();
        return res.render("PhotoInspection/photoDashboard.ejs", { requests: file });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
}
);

export { router };
