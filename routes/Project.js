import express from "express";
import { projectModel } from "../models/project.js";
import { taskModel } from "../models/Task.js";

const router = express.Router();

/*get task based on project id */
router.get("/:projectId/task", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await taskModel
      .find({ project: projectId })
      .populate("taskAssign")
      .populate("project");
    console.log("tasks", tasks);
    return res.render("Dashboard/Tasks.ejs", { tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await projectModel.find();
    return res.render("Dashboard/Projects.ejs", { projects });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newProject = new projectModel({
      projectName: req.body.projectName,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: req.body.status,
    });

    const project = await newProject.save();
    res.render("Dashboard/NewProject.ejs", {
      project,
      message: "Project Added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/new", async (req, res) => {
  try {
    res.render("Dashboard/NewProject.ejs", { project: "" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    res.render("Dashboard/ProjectDetails.ejs", { project });
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

    res.render("Dashboard/Tasks.ejs", { project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const project = await projectModel.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const projects = await projectModel.find();

    return res.render("Dashboard/Projects.ejs", { projects });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export { router };
