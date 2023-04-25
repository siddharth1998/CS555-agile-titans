import express from "express";
import { attachmentModel } from "../models/attachment.js";
import { commentModel } from "../models/comment.js";
import { taskModel } from "../models/Task.js";
import { userModel } from "../models/user.js";
import { projectModel } from "../models/project.js";
import { createObjectCsvWriter } from "csv-writer";
import { promisify } from "util";
import fs from "fs";

const router = express.Router();

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

//Backend API for downloading task data in csv, using downloadCSVData function
router.get("/download", async (req, res) => {
  try {
    const tasks = await taskModel.find().populate("taskAssign");

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

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const task = new taskModel(req.body);
    const users = await userModel.find();
    const projects = await projectModel.find();
    await task.save();
    res.render("Dashboard/NewTask.ejs", {
      task,
      users,
      projects,
      message: "Task Added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await taskModel
      .find()
      .populate("taskAssign")
      .populate("project");
    console.log("tasks", tasks);
    return res.render("Dashboard/Tasks.ejs", { tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/new", async (req, res) => {
  try {
    const users = await userModel.find();
    const projects = await projectModel.find();
    res.render("Dashboard/NewTask.ejs", { task: "", users, projects });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const task = await taskModel
      .findById(req.params.id)
      .populate("project")
      .populate("taskAssign");
    const users = await userModel.find();
    const projects = await projectModel.find();
    res.render("Dashboard/TaskEdit.ejs", { task, users, projects });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await taskModel
      .findById(req.params.id)
      .populate("project")
      .populate("taskAssign")
      .populate("collabrators")
      .populate("comments.createdBy");
    if (!task) {
      return res.status(404);
    }
    console.log(task);
    return res.render("Dashboard/TaskDetails.ejs", { task });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const task = await taskModel
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .populate("project")
      .populate("taskAssign");

    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.render("Dashboard/TaskDetails.ejs", { task });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    const tasks = await taskModel.find();

    return res.render("Dashboard/Tasks.ejs", { tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/tasks/:id/comments", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task.comments);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id/attachments", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task.attachments);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/tasks/:id/comments", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).send();
    }
    const comment = new commentModel(req.body);
    await comment.save();
    task.comments.push(comment._id);
    await task.save();
    res.status(201).send(task.comments[task.comments.length - 1]);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/tasks/:id/attachments", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).send();
    }
    const attachment = new attachmentModel(req.body);
    await attachment.save();
    task.attachments.push(attachment._id);
    await task.save();
    res.status(201).send(task.attachments[task.attachments.length - 1]);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id/comments/:commentId", async (req, res) => {
  try {
    const taskId = req.params.id;
    const commentId = req.params.commentId;
    const comment = await commentModel.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/tasks/:id/attachments/:attachmentId", async (req, res) => {
  const taskId = req.params.id;
  const attachmentId = req.params.attachmentId;
  const attachment = await attachmentModel.findByIdAndDelete(attachmentId);
  if (!attachment) {
    return res.status(404).send("attachment not found");
  }
  try {
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { $pull: { attachments: { _id: attachmentId } } },
      { new: true }
    );
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

export { router };
