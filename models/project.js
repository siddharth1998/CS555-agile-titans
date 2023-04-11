import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      //      enum: ["new", "in progress", "completed"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

export { projectModel };
