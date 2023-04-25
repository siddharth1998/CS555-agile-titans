import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
    },
    Description: {
      type: String,
    },
    priority: {
      type: Number,
    },
    taskAssign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    collabrators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      //      enum: ["new", "in progress", "on hold", "completed"],
      //      default: "new",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    attachments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attachment",
      },
    ],
    labels: [
      {
        type: String,
      },
    ],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
    projectName: {
      type: String,
    },
  },

  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema, "task");

export { taskModel };
