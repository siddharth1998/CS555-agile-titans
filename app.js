import "./env.js";
import express from "express"; // http web server
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";
import morgan from "morgan"; // for logging
import { dirname } from "path";
import { fileURLToPath } from "url";
import { router as ticketRouter } from "./routes/form.js";
import { router as userRouter } from "./routes/user.js";
import { router as contractRouter } from "./routes/contract.js";
import { router as contactUsRouter } from "./routes/contactUs.js";
import cors from "cors";
import { router as taskRouter } from "./routes/Task.js";
import { validate } from "./services/auth.js";
import { router as phtoUploadRouter } from "./routes/photoUpload.js";
/** This import will automatically create a database connection for us :) */
import * as dB from "./models/connection.js";
import { router as projectRouter } from "./routes/Project.js";
import dashboardRouter from "./routes/dashboard.js";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`)); // port expose

app.use(morgan("dev")); // middleware to send each reponse via middleware for LOGGING


app.get("/", (req, res) => res.render('LandingPage/LandingPage.ejs'));
app.get("/aboutUs", (req, res) => res.render('AboutUs/AboutUs.ejs'));

app.use(express.static("public"));

/** Contact Us page should be visible to everyone, even though they are not logged in */
app.get("/contactUs", (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.use("/api/contactUs", contactUsRouter);


/** This is where we can put our React app or normal HTML, CSS, JS website inside the public folder. */
app.get("/auth", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

/**
 * All the other requests that are not auth paths are validated with their JWT tokens
 * for header level authorization.
 * We should allow login and sign up routes to be available without authorization.
 */
app.use((req, res, next) =>
  req.url.includes("api/user/auth") ? next() : validate(req, res, next)
);

app.use("/api/user", userRouter);

/** All the pages listed below can only be accessed if the user is logged in */
app.use(validate);

app.use("/dashboard", dashboardRouter);
app.use("/salesperson", contactUsRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/support", ticketRouter);
app.use("/photoUpload", phtoUploadRouter);
app.get("/contractHome", (req, res) => res.render("Contracts/Contract.ejs"));

/** If it is not an API then we redirect to index.html, where react router will take care of which component to render based on URL */
app.use((req, res, next) =>
  req.url.includes("api/")
    ? next()
    : validate(req, res, () => res.sendFile(`${__dirname}/public/index.html`))
);

app.use("/api/task", taskRouter);
app.use("/api/form", ticketRouter);
app.use("/api/contract", contractRouter);
app.use("/api/contactUs", contactUsRouter);
app.use("/api/photoUpload", phtoUploadRouter);

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/project", projectRouter);

export default app;
