const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users.model");
const VendorLead = require("../models/vendorSchema.model");
const MasterLead = require("../models/masterLead.model");
const moment = require("moment");

exports.individualLeadCount = async (req, res) => {
  try {
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required.",
      });
    }

    const vendor = await User.findById(vendorId).select("-password");

    if (!vendor || vendor.role !== "Vendor") {
      return res.status(404).json({
        success: false,
        message: "Vendor not found or invalid role.",
      });
    }
    const assigned = await VendorLead.countDocuments({
      vendor: new mongoose.Types.ObjectId(vendorId),
      status: "assigned",
    });
    const unassigned = await VendorLead.countDocuments({
      vendor: new mongoose.Types.ObjectId(vendorId),
      status: "unassigned",
    });
    const inProgress = await VendorLead.countDocuments({
      vendor: new mongoose.Types.ObjectId(vendorId),
      status: "in-progress",
    });
    const completed = await VendorLead.countDocuments({
      vendor: new mongoose.Types.ObjectId(vendorId),
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

exports.buySubscription = async (req, res) => {
  try {
    const { vendorId, plan } = req.body;

    if (!vendorId || !plan) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID and plan are required.",
      });
    }

    const vendor = await User.findById(vendorId);

    if (!vendor || vendor.role !== "Vendor") {
      return res.status(404).json({
        success: false,
        message: "Vendor not found or invalid role.",
      });
    }
    const subscriptionDate = moment();
    vendor.subscription = plan;
    vendor.subscriptionDate = subscriptionDate;
    await vendor.save();

    await User.updateMany(
      { vendor: vendorId },
      { $set: { subscription: plan, subscriptionDate: moment().toDate() } }
    );

    res.status(201).json({
      success: true,
      message: "Plan changed successfully",
      date: moment().toDate(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in buying the subscription",
      error: error.message,
    });
  }
};

exports.requestLeads = async (req, res) => {
  try {
    const { vendorId, category } = req.body;

    const user = await User.findById(vendorId).select("subscription");
    console.log(user);
    const premiumType = user?.subscription;
    console.log(premiumType);

    // if (!category || !user || !premiumType) {
    //   res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }

    let query = {
      category: { $regex: "electronic", $options: "i" },
    };

    let leads = [];

    if (premiumType === "Free") {
      leads = await MasterLead.find({ ...query, isGenuine: false })
        .select("_id")
        .limit(6)
        .exec();
    } else if (premiumType === "Gold") {
      const genuineFalseLeads = await MasterLead.find({
        ...query,
        isGenuine: false,
      })
        .select("_id")
        .limit(20)
        .exec();

      const genuineTrueLeads = await MasterLead.find({
        ...query,
        isGenuine: true,
        isDiamond: false,
      })
        .select("_id")
        .limit(4)
        .exec();

      leads = [...genuineFalseLeads, ...genuineTrueLeads];
    } else if (premiumType === "Diamond") {
      leads = await MasterLead.find({
        ...query,
        isGenuine: true,
        isDiamond: true,
      })
        .limit(4)
        .exec();
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid type",
      });
    }

    await Promise.all(
      leads?.map(async (leadId) => {
        const vendorLead = await VendorLead.create({
          vendor: vendorId,
          manager: vendorId,
          masterLead: leadId._id,
          status: "unassigned",
        });
      })
    );
    res.status(200).json({
      success: true,
      message: "Leads assigned successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in requesting the leads",
      error: error.message,
    });
  }
};

exports.allLeads = async (req, res) => {
  try {
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required.",
      });
    }

    const vendor = await User.findById(vendorId);

    if (!vendor || vendor.role !== "Vendor") {
      return res.status(404).json({
        success: false,
        message: "Vendor not found or invalid role.",
      });
    }
    const premiumType = vendor.subscription;
    let populateSelectFields = "";

    if (premiumType === "Free") {
      populateSelectFields = "name location details";
    } else {
      populateSelectFields = "-isGenuine -isDiamond";
    }

    const leads = await VendorLead.find({
      vendor: new mongoose.Types.ObjectId(vendorId),
    })
      .select("status masterLead assignedTo assignedBy manager")
      .populate({
        path: "masterLead",
        select: populateSelectFields,
      })
      .populate({
        path: "assignedTo",
        select: "firstName lastName _id",
      })
      .populate({
        path: "assignedBy",
        select: "firstName lastName _id",
      })
      .populate({
        path: "manager",
        select: "firstName lastName _id",
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

exports.addEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      vendorId,
      manager,
    } = req.body;

    if (!vendorId || !lastName || !email || !password || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required.",
      });
    }

    const vendor = await User.findById(vendorId);

    if (!vendor || vendor.role !== "Vendor") {
      return res.status(404).json({
        success: false,
        message: "Vendor not found or invalid role.",
      });
    }

    const employee = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      vendor: vendorId,
      subscription: vendor.subscription,
    });

    if (role === "Employee" && manager !== "") {
      employee.manager = manager;
    } else if (role !== "Manager") {
      res.status(404).json({
        success: fase,
        message: "enter valid role for employee",
      });
    }

    employee.role = role;
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

exports.allManager = async (req, res) => {
  try {
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required.",
      });
    }

    const managers = await User.find({
      vendor: new mongoose.Types.ObjectId(vendorId),
      role: "Manager",
    }).select("_id firstName lastName");

    res.status(201).json({
      success: true,
      message: "all manager fetched successfully",
      managers,
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

exports.managerDetails = async (req, res) => {
  try {
    const { managerId } = req.params;

    if (!managerId) {
      return res.status(400).json({
        success: false,
        message: "Manager ID is required.",
      });
    }

    const manager = await User.find({
      _id: managerId,
      vendor: new mongoose.Types.ObjectId(req.body.vendorId),
      role: "Manager",
    }).select("-password");

    res.status(201).json({
      success: true,
      message: " manager fetched successfully",
      manager,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching manager",
      error: error.message,
    });
  }
};

exports.allEmployee = async (req, res) => {
  try {
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required.",
      });
    }

    const employee = await User.find({
      vendor: new mongoose.Types.ObjectId(vendorId),
    })
      .populate("manager")
      .select("-password");

    res.status(201).json({
      success: true,
      message: " all employee fetched successfully",
      employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching employees",
      error: error.message,
    });
  }
};

exports.assignLeads = async (req, res) => {
  try {
    const { vendorId, managerId, leads } = req.body;

    if (
      !vendorId ||
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
        vendor: new mongoose.Types.ObjectId(vendorId),
      },
      {
        $set: {
          manager: new mongoose.Types.ObjectId(managerId),
          status: "assigned",
          assignedTo: new mongoose.Types.ObjectId(managerId),
          assignedBy: new mongoose.Types.ObjectId(vendorId),
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

exports.employeeLeads = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "employeeId is required.",
      });
    }

    const leads = await VendorLead.find({
      vendor: new mongoose.Types.ObjectId(req.body.vendorId),
      $or: [
        { assignedTo: new mongoose.Types.ObjectId(employeeId) },
        { manager: new mongoose.Types.ObjectId(employeeId) },
      ],
    })
      .populate({
        path: "masterLead",
        select: "-isGenuine",
      })
      .populate({
        path: "manager",
        select: "firstName lastName email",
      })
      .populate({
        path: "assignedBy",
        select: "firstName lastName email role",
      });

    res.status(201).json({
      count: leads.length,
      success: true,
      message: "lead fetched successfully",
      leads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching lead of employees",
      error: error.message,
    });
  }
};

exports.employeeDetails = async (req, res) => {
  try {
    const { vendorId, employeeId } = req.body;
    if (!vendorId) {
      return res.status(400).json({
        message: "vendor Id is required",
        status: "false",
      });
    }
    const employee = await User.findById(employeeId)
      .select("-password")
      .populate({
        path: "manager",
        select: "-password",
      });

    const assignedLeads = await VendorLead.find({
      $or: [
        { assignedTo: new mongoose.Types.ObjectId(employeeId) },
        { manager: new mongoose.Types.ObjectId(employeeId) },
      ],
    })
      .populate({
        path: "masterLead",
        select: "-isDiamond -isGenuine",
      })
      .populate({
        path: "assignedTo",
        select: "_id firstName lastName",
      });
    const data = {};

    data.assignLeads = assignedLeads;

    if (employee.role === "Employee") {
      // const manager = await User.findById(employee.manager).select("-password");
      // data.manager= manager
      data.details = employee;
    } else {
      const employees = await User.find({
        manager: new mongoose.Types.ObjectId(employeeId),
      }).select("-password -vendor -manager -role -subscription");

      data.employees = employees;
    }
    res.status(200).json({
      message: "details fetched successfull",
      status: true,
      details: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching the details",
      status: false,
    });
  }
};

exports.totalEmployees = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const employees = await User.countDocuments({
      vendor: new mongoose.Types.ObjectId(vendorId),
    });

    res.status(200).json({
      message: "Count of total employees",
      status: true,
      employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching the details",
      status: false,
    });
  }
};

exports.totalLeads = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const leads = await VendorLead.countDocuments({
      vendor: new mongoose.Types.ObjectId(vendorId),
    });

    res.status(200).json({
      message: "Count of the completed leads",
      status: true,
      leads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching the details",
      status: false,
    });
  }
};

exports.recentCompletedLeads = async (req, res) => {
  try {
    const { vendorId } = req.body;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const completedLeads = await VendorLead.find({
      vendor: new mongoose.Types.ObjectId(vendorId),
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
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const completedLeads = await VendorLead.countDocuments({
      status: "completed",
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
    const { vendorId } = req.body;
    const vendor = await User.findById(vendorId).select(
      "subscriptionDate subscription"
    );
    const subscriptionDate = moment(vendor.subscriptionDate);

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
        subscription: vendor.subscription,
      });
    }

    const remainingDuration = endDate.diff(now, "days");

    console.log(remainingDuration , "remaining duration");
    return res.status(200).json({
      message: "remaing days of subscription",
      status: true,
      remainingDuration,
      subscription: vendor.subscription,
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
    const { vendorId } = req.body;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const topEmployee = await VendorLead.aggregate([
      {   
        $match: {
          status: "completed",
          vendor: new mongoose.Types.ObjectId(vendorId),
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

exports.searchEmployee = async (req, res) => {
  try {
    const { search } = req.body;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const users = await User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        },
        { role: { $in: ["Employee", "Manager"] } },
        { vendor: new mongoose.Types.ObjectId(req.body.vendorId) },
      ],
    });

    return res.status(200).json({
      size: users.length,
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching the users",
      error: error.message,
    });
  }
};
