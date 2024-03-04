const User = require("../models/User");
const Verification = require("../models/Verification");
const customError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailSender = require("../utils/nodemailer");
const crypto = require("crypto");

const userController = {
  userRegister: async (req, res) => {
    const { name, email, password, orgnaizationName } = req.body;
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      throw new customError(409, "User already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      orgnaizationName,
      password: hashedPassword,
    });
    if (user) {
      const token = await Verification.create({
        token: crypto.randomBytes(32).toString("hex"),
      });
      const link = `http://localhost:3000/api/v2/user/verify/?userid=${user._id}&token=${token.token}`;
      const recipient = {
        email: email,
        subject: "Welcome to Email Automation",
        message: `
        <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Our Community!</title>
<style>
  /* CSS styles for email layout */
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  h1 {
    color: #333;
  }
  p {
    color: #666;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
  }
</style>
</head>
<body>
<div class="container">
  <h1>Welcome to Our Community!</h1>
  <p>Dear ${name},</p>
  <p>Thank you for registering with us. We are thrilled to have you as a part of our community!</p>
  <p>Feel free to explore and engage with our community. If you have any questions or need assistance, don't hesitate to reach out to us.</p>
  <p>Best regards,</p>
  <h2>Click below link to verify </h2>
  <p>${link}</p>
</div>
</body>
</html>

        `,
      };
      emailSender(recipient);
      res.status(201).json({ message: "User created successfully!" });
    }
  },
  userLogin: async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (userExist.verified == "false")
      throw new customError(403, "User is not verified!");
    if (!userExist) throw new customError(404, "Invalid Credentials");
    const token = jwt.sign({ userid: userExist._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token)
      .json({ message: "User login successfully!" });
  },

  userVerify: async (req, res) => {
    const { userid } = req.query;
    const { token } = req.query;
    const user = await User.findOne({ _id: userid });
    const userWithToken = await Verification.findOne({
      token: token,
    });
    if (!userWithToken) throw new customError(404, "User not exist");
    const recipient = {
      email: user.email,
      subject: "Welcome to Our Platform!",
      message: `
            <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Platform!</title>
      <style>
        /* Styles for the email */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f8f8;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
          text-align: center;
        }
        p {
          color: #666666;
          line-height: 1.6;
        }
        .cta-button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
        }
        .cta-button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Our Platform!</h1>
        <p>Dear ${user.name},</p>
        <p>Thank you for creating an account with us! You're now part of our community.</p>
        <p>Explore our platform to discover exciting features, amazing products, and valuable resources.</p>
        <p>Get started today and enjoy everything our platform has to offer!</p>
        <p><a href="#" class="cta-button">Start Exploring</a></p>
        <p>If you have any questions or need assistance, don't hesitate to contact us.</p>
        <p>Best regards,<br>Your Team</p>
      </div>
    </body>
    </html>

            `,
    };
    // console.log(recipient);
    emailSender(recipient);
    user.verified = true;
    await user.save();
    return res.status(200).json({ message: "User verified Successfully" });
  },
};

module.exports = { userController };
