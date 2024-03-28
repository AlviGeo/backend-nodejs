// Access Token
const jwt = require("jsonwebtoken");

// Fastest Validator
const Validator = require("fastest-validator");
const v = new Validator();
const userValidator = require("./validator/user.validator");

// Bcrypt Password
const bcrypt = require("bcrypt");

// Import Model
const db = require("../../models");
const User = db.User;

// Variable for Token
const { SECRET_TOKEN, SECRET_EXPIRED } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Login Requirement
    const validateLogin = v.validate(req.body, userValidator.login);

    // Error Message if Validate Failed
    if (validateLogin.length) {
      return res.status(400).json({
        status: "error",
        message: validateLogin,
      });
    }

    // Check if email exist in DB
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Email is Wrong!",
      });
    }

    // Check if the password is same with the DB
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(400).json({
        status: "error",
        message: "Wrong Password",
      });
    }

    // Payload for generate token
    const data = await User.findOne({
      where: { id: user.id },
      attributes: ["id", "email"],
    });

    // Generate Access Token
    const accessToken = jwt.sign({ data }, SECRET_TOKEN, {
      expiresIn: SECRET_EXPIRED,
    });

    // Store token in localStorage
    await User.update(
      { access_token: accessToken },
      { where: { id: user.id } }
    );

    return res.json({ status: "success", token: accessToken });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = login;
