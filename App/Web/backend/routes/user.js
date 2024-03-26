import express from "express";
import bcryt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exists" });
  }

  const hashpassword = await bcryt.hash(password, 10);
  const newUser = new User({ name, email, password: hashpassword });
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
export { router as UserRouter };
