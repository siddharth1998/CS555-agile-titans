import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as ticketRouter } from "./routes/form.js";
import { router as userRouter } from "./routes/user.js";
import { router as contractRouter } from "./routes/contract.js";
import { router as contactUsRouter } from "./routes/contactUs.js";
import cors from "cors";
import { router as taskRouter } from "./routes/Task.js";
import { validate } from "./services/auth.js";

/** This import will automatically create a database connection for us :) */
import * as dB from "./models/connection.js";
import { router as projectRouter } from "./routes/Project.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`));

app.use(morgan("dev"));

app.use(express.static('public'));

/** This is where we can put our React app or normal HTML, CSS, JS website inside the public folder. */
app.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

/** If it is not an API then we redirect to index.html, where react router will take care of which component to render based on URL */
app.use((req, res, next) => req.url.includes("api/") ? next() : res.sendFile(`${__dirname}/public/index.html`));

/** 
 * All the other requests that are not auth paths are validated with their JWT tokens
 * for header level authorization.
 * We should allow login and sign up routes to be available without authorization.
*/
app.use((req, res, next) => req.url.includes("api/user/auth") ? next() : validate(req, res, next));

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/form", ticketRouter);
app.use("/api/contract", contractRouter);
app.use("/api/contactUs", contactUsRouter);

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/project",projectRouter);

console.log("I shouldn't be able to merge this code");