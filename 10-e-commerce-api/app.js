require('dotenv').config();
require('express-async-errors');
// in our controllers we are using try / catch => so asynchronous operations
// instead of using try catch everywhere requiring this will apply all of the controllers
// so we don't need to do it ourselves

const express = require('express');
const app = express();

// rest of the packages
const morgan = require('morgan')

// database
const connectDB = require('./db/connect');

app.use(morgan('tiny'))
// need to access json value in req.body
app.use(express.json());
// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/', (req, res) => {
    res.send('e-commerce api');
})

// should be set after all routes which makes sense
app.use(notFoundMiddleware);
// should be at the end by express rules because errors you throw above will be catched here.
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()