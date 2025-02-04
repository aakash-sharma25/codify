const mongoose = require("mongoose");

const masterLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    details: {
      type: String,
    },
    isDiamond:{
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
    },
    isGenuine: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const MasterLead = mongoose.model("MasterLead", masterLeadSchema);
module.exports = MasterLead;
