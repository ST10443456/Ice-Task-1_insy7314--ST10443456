const mongoose = require("mongoose");

const studentClaimSchema = new mongoose.Schema(
  {
    studentNumber: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },

    surname: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },

    hoursWorked: {
      type: Number,
      required: true,
      min: 0.01,
    },

    hourlyRate: {
      type: Number,
      required: true,
      default: 200,
    },

    totalClaimAmount: {
      type: Number,
      required: true,
    },

    dateSubmitted: {
      type: Date,
      required: true,
      default: Date.now,
    },

    status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected", "Cancelled"],
      default: "Pending",
    },
  },
  {
    collection: "studentclaims",
  }
);

module.exports = mongoose.model("StudentClaim", studentClaimSchema);