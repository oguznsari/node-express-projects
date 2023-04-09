const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    const { email, name, password } = req.body;
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists.')
    }

    // 1st registered user is an admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ name, email, password, role });

    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    const token = jwt.sign(
        tokenUser,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        });

    res.status(StatusCodes.ACCEPTED).json({ user: tokenUser, token })
}

const login = async (req, res) => {
    res.send('login user')
}

const logout = async (req, res) => {
    res.send('logout user')
}

module.exports = {
    register,
    login,
    logout
}