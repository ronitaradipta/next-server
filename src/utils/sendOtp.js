const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = (email, otpcode) => {
  return new Promise((resolve, reject) => {
    const options = {
      from: `NextCommerce <${process.env.EMAIL}>`,
      to: email,
      subject: 'One-Time Password (OTP) for Login',
      text: `Kode OTP kamu adalah ${otpcode}`,
      html: `Kode OTP kamu adalah <b>${otpcode}</b>`,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        return reject({
          message: `An error occurred while sending, ${err.message}`,
        });
      }
      return resolve({ message: 'email sent successfully' });
    });
  });
};
