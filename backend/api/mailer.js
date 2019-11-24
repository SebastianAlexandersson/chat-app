"use strict";
const nodemailer = require("nodemailer");

const mailer = async (to, subject, text, html) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'sebbe@sebbe.dev',
      pass: 'sTA_84?BaSSE!'
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