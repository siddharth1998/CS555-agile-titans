import express from "express";
import { create, validate } from "../services/user.js";
import { userModel } from "../models/user.js";
import { getAuthToken } from "../services/auth.js";
import { isValidString } from "../services/helpers.js";

const router = express.Router();

/** /user/auth/signup  */
router.post("/auth/signup", async (req, res) => {
  try {
    if (!req.body)
      res
        .status(400)
        .json({ status: "error", message: "No user details are sent" });

    if (!isValidString(req.body.firstName))
      return res
        .status(400)
        .json({ status: "error", message: "First Name is required" });

    if (!isValidString(req.body.lastName))
      return res
        .status(400)
        .json({ status: "error", message: "Last Name is required" });

    if (!isValidString(req.body.userName))
      return res
        .status(400)
        .json({ status: "error", message: "User Name is required" });

    if (!isValidString(req.body.email))
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });

    if (!isValidString(req.body.password))
      return res
        .status(400)
        .json({ status: "error", message: "Password is required" });

    let user = await create(req.body);
    return res
      .status(201)
      .json({ status: "success", message: "user created successfully", user });
  } catch (err) {
    console.error(`Error while creating a new user`);
    if (err.message.includes("user validation failed")) return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });

    if (err.message.includes("duplicate key error collection") && err.message.includes("userName"))
      return res
        .status(400)
        .json({ status: "error", message: "Username already taken" });

    if (err.message.includes("duplicate key error collection") && err.message.includes("email"))
      return res
        .status(400)
        .json({ status: "error", message: "Email already taken" });
    console.error(err);
    return res.status(500).json({ status: "error", message: "Uh! Oh Something went wrong on our side, we will fix it :)" });
  }
});

/** /user/auth/login */
router.post("/auth/login", async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ status: "error", message: "No user details are sent" });

    if (!req.body.email)
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });

    if (!req.body.password)
      return res
        .status(400)
        .json({ status: "error", message: "Password is required" });

    let valid = await validate(req.body.email, req.body.password);

    if (valid) {
      let { password, ...rest } = valid.toObject();
      res.cookie('Auth', getAuthToken(rest), { httpOnly: true, secure: true });
      return res
        .status(200)
        .json({ status: "success", message: "user logged in successfully", token: getAuthToken(rest), user: rest });
    }

    return res
      .status(401)
      .json({ status: "error", message: "Invalid Credentials" });
  } catch (err) {
    if (err === "user not found") return res.status(401).json({ status: "error", message: "Invalid Credentials" });
    console.error(`Error while logging user`);
    console.error(err);
    return res.status(500).json({ status: "error", message: "Uh! Oh Something went wrong on our side, we will fix it :)" });
  }
});

/**
 * @name /user/auth/logout
 */
router.get("/auth/logout", async (req, res) => {
  res.clearCookie('Auth');
  return res.redirect("/");
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export { router };
