import express from "express";
import bcryt from "bcrypt";
import { User } from "../models/User.js";
import { Patient } from "../models/Patient.js";
import { Notification } from "../models/Notifications.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, type, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exists" });
  }

  const hashPassword = await bcryt.hash(password, 10);
  const newUser = new User({ name, email, password: hashPassword, type });
  await newUser.save();
  return res.json({ status: true, message: "record registered" });
});

router.post("/notifications", async (req, res) => {
  const { email, notificationId, accept } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Fatal Error! user is non-existent? logout and login again.",
    });
  }
  if (!accept) {
    await Notification.findByIdAndDelete(notificationId);
    return res.json({
      status: true,
      message: "Assistant invitation declined successfully!",
    });
  }
  const notif = await Notification.findById(notificationId);
  const patientX = await Patient.findById(notif.patient);
  patientX.assistants.push(user._id);
  await patientX.save();
  await notif.deleteOne();
  return res.json({
    status: true,
    message: "Assistant invitation accepted successfully!",
  });
});

router.post("/operation", async (req, res) => {
  const {
    operation,
    patientAge,
    patientName,
    assistantEmail,
    doctorEmail,
    tableData,
    condition,
    email,
  } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Fatal Error! user is non-existent? logout and login again.",
    });
  }

  switch (operation) {
    case "patient": {
      //Creation d'un nouveau patient
      const newPatient = new Patient({
        name: patientName,
        primaryAssistant: user._id,
        age: patientAge,
        condition: condition,
      });
      await newPatient.save();
      break;
    }
    case "assistant": {
      //Ajouter un assistant
      //Passer par chaque patient et enovyer l'invitation au nouvel assistant secondaire
      if (email === assistantEmail) {
        return res.status(400).json({
          message: "Fatal Error! you can't invite yourself.",
        });
      }
      for (let element of tableData) {
        let secondaryAssistant = await User.findOne({
          email: assistantEmail,
        });
        let patientX = await Patient.findOne({ _id: element });
        let newNotif = new Notification({
          message: `Vous avez été invité par ${
            user.name
          } pour assister le patient ${patientX.name} atteint d'${
            patientX.condition === "autism" ? "Autisme" : "Alzheimer"
          }`,
          sender: user._id,
          receiver: secondaryAssistant._id,
          patient: element,
        });
        await newNotif.save();
      }
      break;
    }
    case "doctor": {
      //Ajouter un médecin
      //Passer par chaque patient et lui associer le nouveau médecin
      for (let element of tableData) {
        if (email === doctorEmail) {
          return res.status(400).json({
            message: "Fatal Error! you can't invite yourself.",
          });
        }
        let doctor = await User.findOne({
          email: doctorEmail,
        });
        let patientX = await Patient.findOne({ _id: element });
        let newNotif = new Notification({
          message: `Vous avez reçu une invitation pour superviser le patient ${
            patientX.name
          } atteint d'${
            patientX.condition === "autism" ? "Autisme" : "Alzheimer"
          }`,
          sender: user._id,
          receiver: doctor._id,
          patient: element,
        });
        await newNotif.save();
      }
      break;
    }
    case "delete": {
      //check first if checked patients are all created by that assistant
      for (let element of tableData) {
        let patientX = await Patient.findOne({ _id: element });
        if (!patientX.primaryAssistant.equals(user._id)) {
          return res.status(401).json({
            status: false,
            message:
              "Permission Denied! Interrupting Operation... Are you really the primary assistant?",
          });
        }
      }
      //deleting
      for (let element of tableData) {
        let patientX = await Patient.findOne({ _id: element });
        await patientX.deleteOne();
      }
      break;
    }
    default: {
      console.log("Error, missing operation...");
      return res
        .status(401)
        .json({ status: false, message: "operation failed!" });
    }
  }
  return res.json({ status: true, message: "operation succeeded" });
});

router.post("/login", async (req, res) => {
  const { emailLogin, passwordLogin } = req.body;
  const user = await User.findOne({ email: emailLogin });
  if (!user) {
    return res.status(401).json({ message: "user is not registered" });
  }

  const validPassword = await bcryt.compare(passwordLogin, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "password is incorrect" });
  }
  const token = jwt.sign(
    { nameLogin: user.nameLogin, id: user._id },
    process.env.KEY,
    {
      expiresIn: "10h",
    }
  );
  //expires in 1 hour
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({
    status: true,
    message: "login successful",
    accessToken: token,
  });
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
router.get("/userdata", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const info = await User.findById(id);
    const patientsCreated = await Patient.find({ primaryAssistant: info._id });
    const notifications = await Notification.find({ receiver: info._id });
    // const patientsSecondary = await Patient.find({})
    //   .where(info._id)
    //   .in("assistants");
    // console.log("secondary");
    // console.log(patientsSecondary);
    return res.json({
      status: true,
      name: info.name,
      email: info.email,
      type: info.type,
      patientsCreated: [...patientsCreated],
      notifications: [...notifications],
    });
  } catch (err) {
    return res.json(err);
  }
});

export { router as UserRouter };
