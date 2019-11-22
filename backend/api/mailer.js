"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

const mailer = async (to, subject, text, html) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sebbe@sebbe.dev', // generated ethereal user
      pass: ''
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'no-reply@studentprojekt.se', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
}

module.exports = mailer