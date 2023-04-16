require('dotenv').config();
require('express-async-errors');
// in our controllers we are using try / catch => so asynchronous operations
// instead of using try catch everywhere requiring this will apply all of the controllers
// so we don't need to do it ourselves

const express = require('express');
const app = express();

// rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// security packages
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

// routes
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: {
        msg: 'Too many requests from this IP, please try again after 15 minutes.'
    }
}));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('tiny'))
// need to access json value in req.body
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/', (req, res) => {
    res.send('e-commerce api');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

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