import express from "express";// http web server
import { PORT } from "./config.js";
import morgan from "morgan";// for logging
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as userRouter} from "./routes/user.js";
import { router as phtoUploadRouter} from "./routes/photoUpload.js";
/** This import will automatically create a database connection for us :) */
import * as dB from "./models/connection.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     if (req.originalUrl.startsWith("/photoUpload")) {
//         next();// to skip the code 
//     } else {
//         express.json()(req, res, next);// to only use json 
//     }
// });

app.use(express.json());

app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`));// port expose

app.use(morgan("dev"));// middleware to send each reponse via middleware for LOGGING 

app.use(express.static('public'));

/** This is where we can put our React app or normal HTML, CSS, JS website inside the public folder. */
app.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`));// route 


app.use("/photoUpload",phtoUploadRouter);
app.use("/ ", userRouter);
