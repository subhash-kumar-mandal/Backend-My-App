require('dotenv/config');
const nodemailer = require('nodemailer');
const { getOtpEmailHtml } = require('./helper');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

const sendEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"WeChat" <${process.env.GMAIL_USER}>`,
    to: to,
    subject: 'Your Verification Code',
    html: getOtpEmailHtml(otp)
  })
};


module.exports = sendEmail;