const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

exports.isSuperAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is missing",
      });
    }
    // console.log(token);

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (decodedToken.role !== "SuperAdmin") {
      return res.status(404).json({
        success: false,
        message: "Protected route for admin",
      });
    }
    // console.log(decodedToken);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "invalid token",
    });
  }
};

exports.isVendor = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is missing",
      });
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (decodedToken.role !== "Vendor") {
      return res.status(404).json({
        success: false,
        message: "Protected route for Vendor",
        decodedToken,
      });
    }
    req.body.vendorId = decodedToken._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "invalid token",
    });
  }
};

exports.isEmployee = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is missing",
      });
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (decodedToken.role !== "Employee") {
      return res.status(404).json({
        success: false,
        message: "Protected route for Employee",
        // decodedToken,
      });
    }
    req.body.employeeId = decodedToken._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "invalid token",
    });
  }
};
exports.isManager = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is missing",
      });
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (decodedToken.role !== "Manager") {
      return res.status(404).json({
        success: false,
        message: "Protected route for Manager",
        decodedToken,
      });
    }
    req.body.managerId = decodedToken._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "invalid token",
    });
  }
};
