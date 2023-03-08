import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },

  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema, "comment");

export { commentModel };
