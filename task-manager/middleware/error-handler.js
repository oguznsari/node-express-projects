const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({ msg: `Something went wrong, please see the details...`, err: err });
}

module.exports = errorHandlerMiddleware;