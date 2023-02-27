const nodemailer = require("nodemailer");

module.exports = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // port for secure SMTP
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
