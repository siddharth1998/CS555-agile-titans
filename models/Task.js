import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    taskAssign: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    collabrators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    ],
    dueDate: {
      type: Date,
    },
    reminderDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["new", "in progress", "on hold", "completed"],
      default: "new",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "comment",
      },
    ],
    attachments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "attachment",
      },
    ],
    labels: [
      {
        type: String,
        required: true,
      },
    ],
    estimatedTime: {
      type: Number,
      default: 0,
    },
    completedTime: {
      type: Number,
      default: 0,
    },
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    completedDate: {
      type: Date,
    },
    timeSpent: {
      type: Number,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema, "task");

export { taskModel };
