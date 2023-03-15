const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
// const { BadRequestError } = require('../errors')

const register = async (req, res) => {
    /* optional validation on the controller (code repetition since mongoose already does that for us)
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name, email and password.', StatusCodes.BAD_REQUEST)
    }
    */

    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('Login User.')
}

module.exports = {
    register,
    login
}