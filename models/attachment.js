import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    url: {
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

const attachmentModel = mongoose.model(
  "attachment",
  attachmentSchema,
  "attachment"
);

export { attachmentModel };
