const User = require("../models/users.model");
const bcrypt = require("bcrypt");


exports.registerController = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    }).save();

    return res.status(200).json({
      success: true,
      message: "user registerd successfully",
      user,
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
    const match = await bcrypt.compare(password, user.password);

    // console.log(match,"this is match")

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password please enter correct password",
      });
    }

    // const token = JWT.sign({ _id: user._id },
    //                         process.env.JWT_SECRET, {
    //                                 expiresIn: "2d",
    //                                 });
    return res.status(200).json({
      success: true,
      message: "login successfull",
      user,
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
