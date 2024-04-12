const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS if necessary
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Transfaring Emails through NodeMailer.");
});

// Handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, message, mail_from, mail_to, mail_subject } = req.body;

  // Send email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NodeMailer_EMAIL,
      pass: process.env.NodeMailerEMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${mail_from}  <web.formtransporter@gmail.com>`, // sender address
    to: `${mail_to}`, // list of receivers
    subject: `${mail_subject}`,
    html: `<p style="font-size: 16px;"> Name: <span style="font-size: 20px; margin-left: 20px; font-weight: 700;" >${name}</span></p> <p style="font-size: 16px;">Email: <span style="font-size: 20px; margin-left: 20px; font-weight: 700;" >${email}</span></p> <p style="font-size: 16px;">Message: <span style="font-size: 20px; margin-left: 20px;" >${message}</span></p>`, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Form submitted successfully");
    }
  });
});

// Node server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
