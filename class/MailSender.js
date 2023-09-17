"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");
const { MAIL_SENDER, MAIL_PASS } = process.env;

const sendVerificationMail = async (pName, pEmail, pService, pMessage) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MAIL_SENDER,
      pass: MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: MAIL_SENDER,
    to: "dnep@outlook.fr",
    subject: pService,
    html: pName + " " + pEmail + " " + pMessage + " ",
  });

  return info;
};

module.exports = { sendVerificationMail };
