// Fastest Validator
const Validator = require("fastest-validator");
const v = new Validator();
const userValidator = require("./validator/user.validator");

// Bcrypt Password
const bcrypt = require("bcrypt");

// Import Model
const db = require("../../models");
const User = db.User;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Register Requirement
    const validateRegister = v.validate(req.body, userValidator.register);

    // Message Validate
    if (validateRegister.length) {
      return res.status(400).json({
        status: "error",
        message: validateRegister,
      });
    }

    // Check Email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists. Please choose a different email.",
      });
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      email: email,
      password: passwordHash,
    };

    // Insert User to DB
    const insertUser = await User.create(userData);

    if (!insertUser) {
      return res.status(500).json({
        status: "error",
        message: "Failed to register user. Please check your data again.",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Successfully registered!",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = register;
