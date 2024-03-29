// string user id mongo.objectID
// email string
// AWS s3 url string
// BO string
// timestamps 
//
import mongoose from "mongoose";


const photoUpload= new mongoose.Schema(
    {
        customerID:{
            type:String,
            required:true
        },
        fileNames:{
            type:Array, 
            required: true
        },
        content:{
            type:String,
            require:true
        },
        operation:{
            type:String,
            required:true
        },
        status: {
            type: Boolean,
            required: true,
        }
    },

    { timestamps: true }
);

const photoUploadModel = mongoose.model(
    "photoUploadInfo",
    photoUpload,
    "photoUploadInfo"
  );
  
  export { photoUploadModel };