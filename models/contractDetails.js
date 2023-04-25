import mongoose from "mongoose";

const contractDetailsSchema = new mongoose.Schema(
  {
    contractNo: {
      type: String,
      required: true,
      unique: true,
    },
    dateSigned: {
      type: Date,
      required: true,
    },
    firstParty: {
      type: String,
      required: true,
    },
    secondParty: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    noticePeriod: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    firstPartySignature: {
      type: String,
      required: true,
    },
    secondPartySignature: {
      type: String,
    },
  },
  { timestamps: true }
);

const contractDetailsModel = mongoose.model(
  "contractDetails",
  contractDetailsSchema,
  "contractDetails"
);

export { contractDetailsModel };
