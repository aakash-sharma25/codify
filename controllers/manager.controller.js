const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users.model");
const VendorLead = require("../models/vendorSchema.model");
const moment = require("moment")

exports.managerDetails = async (req, res) => {
  try {
    const { managerId } = req.body;

    if (!managerId) {
      return res.status(400).json({
        success: false,
        message: "Manager ID is required.",
      });
    }

    const manager = await User.findById(managerId).select("-password");

    if (!manager || manager.role !== "Manager") {
      return res.status(404).json({
        success: false,
        message: "Manager not found or invalid role.",
      });
    }

    const totalLeads = await VendorLead.countDocuments({
      manager: new mongoose.Types.ObjectId(managerId),
    });
    const totalEmployees = await User.countDocuments({
      manager: new mongoose.Types.ObjectId(managerId),
    });

    const assigned = await VendorLead.countDocuments({
      manager: new mongoose.Types.ObjectId(managerId),
      status: "assigned",
    });
    const unassigned = await VendorLead.countDocuments({
      manager: new mongoose.Types.ObjectId(managerId),
      status: "unassigned",
    });
    const inProgress = await VendorLead.countDocuments({
      manager: new mongoose.Types.ObjectId(managerId),
      status: "in-progress",
    });
    const completed = await VendorLead.countDocuments({
      manager: new mongoose.Types.ObjectId(managerId),
      status: "completed",
    });

    const chartData = [
      { id: 0, value: assigned, color: "blue", label: "Assigned" },
      { id: 1, value: unassigned, color: "orange", label: "Un Assigned" },
      { id: 2, value: completed, color: "green", label: "Completed" },
      { id: 3, value: inProgress, color: "pink", label: "In Progress" },
    ];

    res.status(201).json({
      success: true,
      message: "all details fetched successfully",
      manager,
      totalLeads,
      totalEmployees,
      chartData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching the details",
      error: error.message,
    });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, managerId } = req.body;

    if (
      !managerId ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "all field are required.",
      });
    }

    const manager = await User.findById(managerId);

    if (!manager || manager.role !== "Manager") {
      return res.status(404).json({
        success: false,
        message: "manager not found or invalid role.",
      });
    }

    const employee = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: "Employee",
      vendor: manager.vendor,
      manager: managerId,
      subscription: manager.subscription,
    });
    await employee.save();

    res.status(201).json({
      success: true,
      message: "employee added successfully",
      employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in adding employee",
      error: error.message,
    });
  }
};

exports.allEmployee = async (req, res) => {
  try {
    const { managerId } = req.body;

    if (!managerId) {
      return res.status(400).json({
        success: false,
        message: "Manager ID is required.",
      });
    }

    const employees = await User.find({
      manager: new mongoose.Types.ObjectId(managerId),
      role: "Employee",
    })
      .select("-password")
      .populate({
        path: "manager",
        select: "firstName lastName _id",
      });

    res.status(201).json({
      success: true,
      message: "all employee fetched successfully",
      employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching all manager",
      error: error.message,
    });
  }
};

exports.allEmployeeList = async (req, res) => {
  try {
    const { managerId } = req.body;

    if (!managerId) {
      return res.status(400).json({
        success: false,
        message: "Manager ID is required.",
      });
    }

    const employees = await User.find({
      manager: new mongoose.Types.ObjectId(managerId),
      role: "Employee",
    }).select("_id firstName lastName");

    res.status(201).json({
      success: true,
      message: "all employee fetched successfully",
      employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching all employees",
      error: error.message,
    });
  }
};

exports.allLeads = async (req, res) => {
  try {
    const { managerId } = req.body;

    if (!managerId) {
      return res.status(400).json({
        success: false,
        message: "Manager ID is required.",
      });
    }

    const manager = await User.findById(managerId);

    if (!manager || manager.role !== "Manager") {
      return res.status(404).json({
        success: false,
        message: "Manager not found or invalid role.",
      });
    }

    const leads = await VendorLead.find({
      manager: new mongoose.Types.ObjectId(managerId),
    })
      .select("masterLead assignedTo status")
      .populate({
        path: "masterLead",
        select: "-isGenuine -isDiamond _id",
      })
      .populate({
        path: "assignedTo",
        select: "firstName lastName email role _id",
      })
      .populate({
        path: "assignedBy",
        select: "firstName lastName email role _id",
      });

    res.status(201).json({
      success: true,
      message: "all leads fetched successfully",
      leads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching all leads",
      error: error.message,
    });
  }
};

exports.assignLeadToEmployee = async (req, res) => {
  try {
    const { managerId, employeeId, leads } = req.body;

    if (
      !employeeId ||
      !managerId ||
      !Array.isArray(leads) ||
      leads.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const assignedLeads = await VendorLead.updateMany(
      {
        _id: { $in: leads },
        manager: new mongoose.Types.ObjectId(managerId),
      },
      {
        $set: {
          status: "assigned",
          assignedTo: new mongoose.Types.ObjectId(employeeId),
          assignedBy: new mongoose.Types.ObjectId(managerId),
        },
      }
    );
    res.status(201).json({
      success: true,
      message: "lead assigned successfully",
      assignedLeads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in assinging lead to employees",
      error: error.message,
    });
  }
};




exports.recentCompletedLeads = async (req, res) => {
  try {
    const { managerId } = req.body;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const completedLeads = await VendorLead.find({
      manager: new mongoose.Types.ObjectId(managerId),
      status: "completed",
      updatedAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("_id masterLead assignedTo updatedAt")
      .populate({
        path: "masterLead",
        select: "name details _id email",
      })
      .populate({
        path: "assignedTo",
        select: "firstName lastName _id",
      });
    res.status(200).json({
      message: "Count of the completed leads",
      status: true,
      completedLeads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching the details",
      status: false,
    });
  }
};

exports.completedLeadsThisMonth = async (req, res) => {
  try {
    const { managerId } = req.body;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const completedLeads = await VendorLead.countDocuments({
      status: "completed",
      manager:new mongoose.Types.ObjectId(managerId),
      updatedAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    res.status(200).json({
      message: "Count of the completed leads",
      status: true,
      completedLeads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching the details",
      status: false,
    });
  }
};

exports.subscriptionEndsIn = async (req, res) => {
  try {
    const { managerId } = req.body;
    const manager = await User.findById(managerId).select(
      "subscriptionDate subscription"
    );
    const subscriptionDate = moment(manager.subscriptionDate);

    console.log(subscriptionDate,"subscription date");
    if (!subscriptionDate.isValid()) {
      return res.status(500).json({ messgae: "invalid subscription date" });
    }

    const endDate = subscriptionDate.clone().add(1, "months");
    console.log(endDate, "end date");
    const now = moment();

    if (now.isAfter(endDate)) {
      console.log("expired date is expired");
      return res.status(200).json({
        message: "Subscription has ended",
        status: true,
        remainingDuration: 0,
        subscription: manager.subscription,
      });
    }

    const remainingDuration = endDate.diff(now, "days");

    console.log(remainingDuration , "remaining duration");
    return res.status(200).json({
      message: "remaing days of subscription",
      status: true,
      remainingDuration,
      subscription: manager.subscription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching the details",
      status: false,
    });
  }
};

exports.topPerformer = async (req, res) => {
  try {
    const { managerId } = req.body;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const topEmployee = await VendorLead.aggregate([
      {   
        $match: {
          status: "completed",
          manager: new mongoose.Types.ObjectId(managerId),
          updatedAt: { $gte: startOfMonth, $lte: endOfMonth },
          assignedTo: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$assignedTo",
          completedLeads: { $sum: 1 },
        },
      },
      { $sort: { completedLeads: -1 } },
      { $limit: 3 },
    ]);
    await User.populate(topEmployee, {
      path: "_id",
      select: "firstName lastName email _id",
    });

    res.status(200).json({
      message: "Top performer employee",
      status: true,
      topEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching the details",
      status: false,
    });
  }
};
