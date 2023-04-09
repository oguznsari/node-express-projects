const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createJWT, isTokenValid } = require('../utils')

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
    const token = createJWT({ payload: tokenUser })

    // matches with JWT expires in
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay)
    })

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