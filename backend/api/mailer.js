"use strict";
const nodemailer = require("nodemailer");

const mailer = async (to, subject, text, html) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  let info = await transporter.sendMail({
    from: 'no-reply@studentprojekt.se',
    to,
    subject,
    text,
    html,
  });
}

module.exports = mailer