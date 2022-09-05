var nodemailer = require('nodemailer');
require('dotenv').config()

const sendMail = (email) => {
    const option = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    };
    var transporter = nodemailer.createTransport(option);

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            const link = `https://www.google.com/`

            var mail = {
                to: email,
                from: process.env.EMAIL,
                subject: 'Notification of account registration.',
                html: `
                  <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                  <p>You have successfully completed the registration process.</p>
                  <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                  <p>……………………………………………………………………………………………</p>
                  <p>*If you do not know the information in this email, please delete it.</p>
                  <p>Note: This is an automatic email, Please do not reply to this email.</p>
                  <br/>
                  <a href="${link}">Click here to activate your account</a>
                  <p>……………………………………………………………………………………………</p>
                  <p>Sender</p>
                  <p>Admin</p>
                  `
            }

            transporter.sendMail(mail, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}

module.exports = sendMail;
