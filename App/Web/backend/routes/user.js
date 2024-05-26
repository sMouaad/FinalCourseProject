import express from "express";
import bcryt from "bcrypt";
import { User } from "../models/User.js";
import { Patient } from "../models/Patient.js";
import { Notification } from "../models/Notifications.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post("/update", upload.single("file"), async (req, res) => {
  const { email, name, password } = req.body;
  const dbInfo = await User.find({});
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      status: false,
      message: "Fatal Error! user is non-existent? logout and login again.",
    });
  }
  const decoded = await jwt.verify(token, process.env.KEY);
  const id = decoded.id;
  const user = await User.findById(id);
  if (user.email !== email) {
    let booleanValue = dbInfo.some((element) => element.email === email);
    if (booleanValue) {
      return res.json({
        status: false,
        message: "You cannot use this email...",
      });
    }
    console.log("NOT SUPPOSED TO GO THERE");
    user.email = email;
  }
  if (password) {
    const hashPassword = await bcryt.hash(password, 10);
    user.password = hashPassword;
  }
  if (req.file) {
    try {
      fs.unlinkSync(`./Images/${user.image}`);
    } catch {
      console.log("file does not exist, so ok!");
    }
    user.image = req.file.filename;
  }
  if (name) user.name = name;
  await user.save();
  return res.json({
    status: true,
    message: "Update Successfull!",
  });
});

router.post("/support", async (req, res) => {
  try {
    const { email, message, subject } = req.body;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mouaadsdi.usthb@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });

    var mailOptions = {
      from: "mouaadsdi.usthb@gmail.com",
      to: "mouaad.sadi11@gmail.com",
      subject: subject,
      text: `The user with email ${email} seeks support with the following message :\n ${message}`,
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
  if (user.type === "assistant") {
    patientX.assistants.push(user._id);
  } else {
    patientX.doctors = user._id;
  }
  await patientX.save();
  await notif.deleteOne();
  return res.json({
    status: true,
    message: "Assistant invitation accepted successfully!",
  });
});

router.post("/operation", async (req, res) => {
  try {
    const {
      token,
      operation,
      patientDate,
      patientName,
      assistantEmail,
      doctorEmail,
      tableData,
      condition,
      email,
    } = req.body;

    if (token) {
      const decoded = await jwt.verify(token, process.env.KEY);
      const id = decoded.id;
      var user = await User.findById(id);
    }

    if (email) {
      var user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Fatal Error! user is non-existent? logout and login again.",
        });
      }
    }
    switch (operation) {
      case "patient": {
        //Creation d'un nouveau patient
        const newPatient = new Patient({
          name: patientName,
          primaryAssistant: user._id,
          date: patientDate,
          condition: condition,
        });
        await newPatient.save();

        return res.json({ status: true, message: "patient created" });
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
        const secondaryAssistant = await User.findOne({
          email: assistantEmail,
        });
        if (!secondaryAssistant) {
          return res.json({
            status: false,
            message: "Not found",
          });
        }
        if (secondaryAssistant.type !== "assistant") {
          return res.json({
            status: false,
            message: "This is not an assistant.",
          });
        }
        for (let element of tableData) {
          let patientX = await Patient.findOne({ _id: element });
          //check if assistant is already associated with that patient
          if (!patientX.assistants.includes(secondaryAssistant._id)) {
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
        }
        break;
      }
      case "doctor": {
        //Ajouter un médecin
        //Passer par chaque patient et lui associer le nouveau médecin
        if (email === doctorEmail) {
          return res.status(400).json({
            message: "Fatal Error! you can't invite yourself.",
          });
        }
        const doctor = await User.findOne({
          email: doctorEmail,
        });
        if (!doctor) {
          return res.json({
            status: false,
            message: "Not found",
          });
        }
        if (doctor.type !== "doctor") {
          return res.json({
            status: false,
            message: "This is not a doctor.",
          });
        }
        for (let element of tableData) {
          let patientX = await Patient.findOne({ _id: element });
          if (patientX) {
            if (!patientX.doctors) {
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
          }
        }
        break;
      }
      case "delete": {
        //check first if checked patients are all created by that assistant, else, dissociate
        //deleting
        for (let element of tableData) {
          let patientX = await Patient.findOne({ _id: element });
          if (patientX.primaryAssistant.equals(user._id)) {
            await patientX.deleteOne();
          } else {
            patientX.assistants = patientX.assistants.filter(
              (element) => !element.equals(user._id)
            );
            await patientX.save();
          }
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
  } catch {
    return res.json({
      status: false,
      message: "Make sure to fill all the fields...",
    });
  }
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
      expiresIn: "3000000d",
    }
  );
  //expires in 1 hour
  res.cookie("token", token, {
    httpOnly: true,
    // maxAge: 3600000
  });
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

router.post("/profiles", async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.json({ status: false, message: "no token" });
  }
  try {
    const decoded = await jwt.verify(accessToken, process.env.KEY);
    const id = decoded.id;
    const info = await User.findById(id);
    const patientsCreated = await Patient.find({ primaryAssistant: info._id });
    const patients = await Patient.find({});
    const secondaryPatients = patients.filter((element) =>
      element.assistants.includes(info._id)
    );
    return res.json({
      status: true,
      patientsCreated: [...patientsCreated],
      secondaryPatients: [...secondaryPatients],
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: "invalid token" });
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
    const patients = await Patient.find({});
    const secondaryPatients = patients.filter((element) =>
      element.assistants.includes(info._id)
    );
    return res.json({
      status: true,
      name: info.name,
      email: info.email,
      type: info.type,
      patientsCreated: [...patientsCreated],
      secondaryPatients: [...secondaryPatients],
      notifications: [...notifications],
      picture: info.image,
    });
  } catch (err) {
    return res.json(err);
  }
});

export { router as UserRouter };
