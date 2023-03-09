import express from "express";

const router = express.Router();
console.log("Reached before the router post photo upload");
router.post("/photoUpload",async (req,res)=>{
    // const file =req.file;
    console.log("reached here");
    res.status(201).json({ status: 'success', message: 'Image successfully', user });
}
);

export { router };
