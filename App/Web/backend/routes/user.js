import express from "express";
import bcryt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exists" });
  }

  const hashPassword = await bcryt.hash(password, 10);
  const newUser = new User({ name, email, password: hashPassword });
  await newUser.save();
  return res.json({ status: true, message: "record registered" });
});

router.post("/login", async (req, res) => {
  const { emailLogin, passwordLogin } = req.body;
  const user = await User.findOne({ email: emailLogin });
  console.log(emailLogin);
  console.log(user);
  if (!user) {
    return res.json({ message: "user is not registered" });
  }

  const validPassword = await bcryt.compare(passwordLogin, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }
  const token = jwt.sign({ nameLogin: user.nameLogin }, process.env.KEY, {
    expiresIn: "1h",
  });
  //expires in 1 hour
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successful" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ status: true, message: "logout successful" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ status: false, message: "user is not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mouaadsdi.usthb@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });

    var mailOptions = {
      from: "mouaadsdi.usthb@gmail.com",
      to: email,
      subject: "Reset Your Password",
      text: `Here is your link to reset your password : http://localhost:5173/login/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending mail" });
      } else {
        return res.json({ status: true, message: "mail sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcryt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashPassword });
    return res.json({ status: true, message: "reset successful" });
  } catch (err) {
    console.log(err);
    return res.json("invalid token");
  }
});
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    next();
  } catch (err) {
    return res.json(err);
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

export { router as UserRouter };
