const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User is already registered",
      });
    }
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      res.status(500).json({
        success: false,
        message: "error in registrstion",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "user registerd successfully",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in registrstion",
      error: error.message,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        success: false,
        message: "please fill all field",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email is not registered",
      });
    }

    const isPasswardValid = await user.isPasswordCorrect(password);

    if (!isPasswardValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password please enter correct password",
      });
    }
    const accessToken = await user.generateAccessToken();

    const options = {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    };

    const loggedInUser = await User.findById(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({
        success: true,
        message: "User login successfull",
        name: loggedInUser.firstName + " " + loggedInUser.lastName,
        role: loggedInUser.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in login",
      error: error.message,
    });
  }
};

exports.logoutController = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).clearCookie("accessToken", options).json({
      success: true,
      message: "User logged out successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in login",
      error: error.message,
    });
  }
};

exports.getRole = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      res.status(404).json({
        success: false,
        message: "Login to continue",
      });
    }
    const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!data) {
      res.status(404).json({
        success: false,
        message: "Login to continue",
      });
    }
    res.status(200).json({
      success: true,
      message: "Verified Usesr",
      role: data.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in getting role",
      error: error.message,
    });
  }
};
