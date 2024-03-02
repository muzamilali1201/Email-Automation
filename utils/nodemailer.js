const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});
const emailSender = async (recipient) => {
  const info = await transporter.sendMail({
    from: process.env.user,
    to: recipient.email,
    subject: recipient.subject,
    html: recipient.message,
  });
};
module.exports = emailSender;
