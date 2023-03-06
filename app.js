import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as userRouter} from "./routes/user.js";
import { router as taskRouter } from "./routes/Task.js";
/** This import will automatically create a database connection for us :) */
import * as dB from "./models/connection.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`));

app.use(morgan("dev"));

app.use(express.static('public'));

/** This is where we can put our React app or normal HTML, CSS, JS website inside the public folder. */
app.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use("/user", userRouter);
app.use("/task", taskRouter);