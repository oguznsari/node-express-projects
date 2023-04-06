const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors')

const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No File uploaded.')
    }
    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload image.')
    }

    const maxSize = 1024 * 1024;                    // 1MB

    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload image smaller 1KB.')
    }

    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
    );

    await productImage.mv(imagePath);

    res
        .status(StatusCodes.OK)
        .json({ image: { src: `/uploads/${productImage.name}` } })
}

module.exports = {
    uploadProductImage
}