const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["Free", "Gold", "Diamond"],
      default:"Free",
      required: true,
    },
    leadLimit: {
      type: Number,
      default: 0,
    },
    accessLevel: {
      type: String,
      enum: ["Partial", "Full", "Genuine"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const SubscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema
);
module.exports = SubscriptionPlan;
