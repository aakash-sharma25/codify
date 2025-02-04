const { default: mongoose } = require("mongoose");
const User = require("../models/users.model");
const VendorLead = require("../models/vendorSchema.model");

exports.allLeads = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const leads = await VendorLead.find({
      assignedTo: new mongoose.Types.ObjectId(employeeId),
    }).populate({
      path:"masterLead",
      select:"-isGenuine -isDiamond"
    }).populate({
      path:"manager",
      select:"firstName lastName _id"
    })
    return res.status(200).json({
      status: true,
      message: "All lead fetched successfully",
      leads,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error in fetching the leads",
      error
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { leadId, status } = req.body;
    const lead = await VendorLead.findByIdAndUpdate(
      leadId,
      { status: status },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      message: "Status Updated Successfully",
      lead,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error in updating the leads status",
    });
  }
};
