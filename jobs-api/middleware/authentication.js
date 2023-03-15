const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticateError } = require('../errors');

const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticateError('Authentication invalid.');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the jobs routes
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticateError('Authentication invalid.')
    }
}

module.exports = auth