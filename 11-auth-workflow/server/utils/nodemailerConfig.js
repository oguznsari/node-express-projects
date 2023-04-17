module.exports = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_MAIL_USERNAME,
        pass: process.env.ETHEREAL_MAIL_PASSWORD
    }
};