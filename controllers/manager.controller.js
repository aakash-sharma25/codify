const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users.model");
const VendorLead = require("../models/vendorSchema.model");

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

    // const assigned = await VendorLead.countDocuments({
    //   vendor: new mongoose.Types.ObjectId(vendorId),
    //   status: "assigned",
    // });
    // const unassigned = await VendorLead.countDocuments({
    //   vendor: new mongoose.Types.ObjectId(vendorId),
    //   status: "unassigned",
    // });
    // const inProgress = await VendorLead.countDocuments({
    //   vendor: new mongoose.Types.ObjectId(vendorId),
    //   status: "in-progress",
    // });
    // const completed = await VendorLead.countDocuments({
    //   vendor: new mongoose.Types.ObjectId(vendorId),
    //   status: "completed",
    // });

    // const chartData = [
    //   { id: 0, value: assigned, color: "blue", label: "Assigned" },
    //   { id: 1, value: unassigned, color: "orange", label: "Un Assigned" },
    //   { id: 2, value: completed, color: "green", label: "Completed" },
    //   { id: 3, value: inProgress, color: "pink", label: "In Progress" },
    // ];

    res.status(201).json({
      success: true,
      message: "all details fetched successfully",
      manager,
      totalLeads,
      totalEmployees,
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
