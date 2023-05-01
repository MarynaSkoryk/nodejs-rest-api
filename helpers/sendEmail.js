// const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config();

// const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

const { META_PASSWORD } = process.env;

const configOptions = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'mskoryk@meta.ua',
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(configOptions);

// const sendEmail = async (data) => {
//   try {
//     const email = { ...data, from: EMAIL_FROM };
//     await sgMail.send(email);
//     console.log('sendEmail');
//     return true;
//   } catch (error) {
//     console.error('sendgrid--->', error);
//   }
// };

const sendEmail = async (data) => {
  await transporter
    .sendMail({ ...data, from: 'testdevelopernodejs@meta.ua' })
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = sendEmail;
