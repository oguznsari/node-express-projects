const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// ETHEREAL version
const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETHEREAL_MAIL_USERNAME,
            pass: process.env.ETHEREAL_MAIL_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '"Oğuzhan SARI" <oguzn.sari@gmail.com>',
        to: 'oguzn.sari@gmail.com',
        subject: 'Hello',
        html: '<h2>Sending emails with nodeJs.</h2>'
    })

    res.json(info);
}

// SENDGRID option
const sendEmail = async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'oguzn.sari@gmail.com',
        from: 'emailsend459@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };

    let info = await sgMail.send(msg);
    res.json(info)
}

module.exports = sendEmail;