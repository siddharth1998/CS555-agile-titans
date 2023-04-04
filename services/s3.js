import S3 from 'aws-sdk/clients/s3.js';
import * as fs from "fs";

const bucketName = process.env.S3BUCKET_NAME;
const region = process.env.S3_REGION;
const access_key = process.env.AWS_ACCESS;
const secret = process.env.AWS_SECRET;

const s3 = new S3({
    region,
    access_key,
    secret
});

// Upload file to S3 
function uploadFiles(file) {
    console.log(bucketName)
    const filestream = fs.createReadStream(file.path)
    const uploadParams = {
        ACL: 'public-read',
        Bucket: bucketName,
        Body: filestream,
        Key: file.filename
    }
    console.log(uploadParams);
    // return "Done";

    return s3.upload(uploadParams).promise();
}

export { uploadFiles };