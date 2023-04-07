const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETHERIAL_MAIL_USERNAME,
            pass: process.env.ETHERIAL_MAIL_PASSWORD
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

module.exports = sendEmail;