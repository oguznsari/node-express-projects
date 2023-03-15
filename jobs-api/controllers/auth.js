const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
// const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    /* optional validation on the controller (code repetition since mongoose already does that for us)
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name, email and password.', StatusCodes.BAD_REQUEST)
    }
    */
    const tempUser = { name, email, password: hashedPassword }
    const user = await User.create({ ...tempUser })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('Login User.')
}

module.exports = {
    register,
    login
}