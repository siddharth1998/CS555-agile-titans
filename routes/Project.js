import express from "express";
import { projectModel } from "../models/project.js";
import { taskModel } from "../models/Task.js";
import { createObjectCsvWriter } from "csv-writer";
import { promisify } from "util";
import fs from "fs";
//import { createCanvas } from "canvas";
//const Chart = require("chart.js");

const router = express.Router();

async function createPieChartImage() {
  // create a canvas to draw the chart on
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");

  // define the data for the chart
  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [20, 30, 50],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  // create a new pie chart and draw it on the canvas
  const chart = new Chart(ctx, {
    type: "pie",
    data: data,
  });

  // get the image data from the canvas
  const imageData = canvas.toBuffer();
}

async function downloadCSVData(data) {
  // Create a new CSV writer
  const writer = createObjectCsvWriter({
    path: "data.csv",
    header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
  });

  // Write the data to the CSV file
  await writer.writeRecords(data);

  // Read the CSV file into a buffer
  const buffer = await promisify(fs.readFile)("data.csv");

  // Return the buffer as a downloadable file
  return {
    filename: "data.csv",
    data: buffer,
  };
}

router.get("/download", async (req, res) => {
  try {
    const projects = await projectModel.find();

    const data = projects.map((project) => {
      return {
        projectName: project.projectName,
        description: project.description,
        status: project.status,
        endDate: project.endDate,
      };
    });

    const file = await downloadCSVData(data);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Backend API for downloading task data in csv, using downloadCSVData function
router.get("/:id/tasks/download", async (req, res) => {
  try {
    const projectId = req.params.id;
    const tasks = await taskModel
      .find({ project: projectId })
      .populate("taskAssign");

    const data = tasks.map((task) => {
      return {
        taskName: task.taskName,
        taskDescription: task.Description,
        taskPriority: task.priority,
        taskAssign: task.taskAssign.firstName,
        taskDueDate: task.dueDate,
        taskStatus: task.status,
      };
    });
    console.log("data::::::", data);
    const file = await downloadCSVData(data);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

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

router.get("/edit/:id", async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    res.render("Dashboard/ProjectEdit.ejs", { project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/edit/:id", async (req, res) => {
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
      { new: req.body.new }
    );

    res.render("Dashboard/ProjectDetails.ejs", { project });
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
