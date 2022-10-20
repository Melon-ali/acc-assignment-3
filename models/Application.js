const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const applicationSchema = mongoose.Schema(
  {
    jobInfo: {
      companyName: {
        type: String,
        required: [true, "Please provide a companyName"],
      },

      jobTitle: {
        type: String,
        required: [true, "Please provide a jobTitle"],
      },

      id: {
        type: ObjectId,
        ref: "Job",
        required: [true, "Please provide a job id"],
      },
    },

    candidateName: {
      type: String,
      required: [true, "Please provide a candidateName"],
    },

    candidateEmail: {
      type: String,
      required: [true, "Please provide a email"],
      validate: [validator.isEmail, "Provide a valid Email"],
    },

    candidateId: {
      type: ObjectId,
      required: [true, "Please provide a candidateId"],
      ref: "User",
    },

    candidatePhoneNumber: {
      type: String,
      required: [true, "Please provide a candidatePhoneNumber"],
    },

    candidateAddress: String,

    resume: String,
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
