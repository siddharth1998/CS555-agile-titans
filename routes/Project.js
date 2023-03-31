import express from "express";
import { projectModel } from "../models/project.js";

const router = express.Router();

router.get("/projects", async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/projects", async (req, res) => {
  try {
    const newProject = new projectModel({
      projectName: req.body.projectName,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      projectManager: req.body.projectManager,
      teamMembers: req.body.teamMembers,
    });

    const project = await newProject.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.put("/projects/:id", async (req, res) => {
  try {
    const project = await projectModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          projectName: req.body.projectName,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          projectManager: req.body.projectManager,
          teamMembers: req.body.teamMembers,
        },
      },
      { new: true }
    );

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.remove();
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export { router };
