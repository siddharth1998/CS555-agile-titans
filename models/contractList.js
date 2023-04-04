import mongoose from "mongoose";

const contractListSchema = new mongoose.Schema(
  {
    contractNo: {
      type: String,
      required: true,
      unique: true,
    },
    contractType: {
      type: String,
      required: true,
    },
    entity: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    dateSigned: {
      type: Date,
    },
    firstParty: {
      type: String,
    },
    secondParty: {
      type: String,
    },
    contractStatus: {
      type: String,
      default: "Not Signed",
    },
  },
  { timestamps: true }
);

const contractListModel = mongoose.model(
  "contractList",
  contractListSchema,
  "contractList"
);

export { contractListModel };
