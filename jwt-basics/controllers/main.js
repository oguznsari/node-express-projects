/*
    Check username, password in the post(login) request
    if exists create a new JWT
    send back to front-end

    Setup authentication so only the request with JWT can access the dashboard
*/

const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    // mongoose validation 
    // Joi
    // check in the controller
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password.', 400)
    }

    const id = new Date().getDate()
    // normally it would be retrieved from db, etc. 

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    // never send password, can be decrepted easily !!! Bad Practice !!!
    // keep payload small
    // JWT_SECRET: in production use long, complex, unguessable string value !!!!! Only keep it on the server and make it complex

    res.status(200).json({ msg: 'user created', token: token })
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    console.log({ token })
    // token validation
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({
            msg: `Hello ${decoded.username}`,
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}.`
        });
        console.log({ decoded })
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route!', 401)
    }
}

module.exports = { login, dashboard }