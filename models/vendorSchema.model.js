const mongoose = require("mongoose");

const vendorLeadSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    masterLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MasterLead",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, 
    status: {
      type: String,
      enum: ["unassigned", "assigned", "in-progress", "completed"],
      default: "unassigned",
    },
    followUp: [
      {
        date: String,
        comment: String,
      },
    ],
    assignmentHistory: [
      {
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        assignedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const VendorLead = mongoose.model("VendorLead", vendorLeadSchema);
module.exports = VendorLead;
