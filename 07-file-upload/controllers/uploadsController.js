const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// renamed to be replaced by cloudinary option
const uploadProductImageLocal = async (req, res) => {
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

// cloudinary solution
const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'file-upload'                   // cloudinary directory
        }
    );

    // after upload remove tmp file
    fs.unlinkSync(req.files.image.tempFilePath);

    res
        .status(StatusCodes.OK)
        .json({ img: { src: result.secure_url } })
}

module.exports = {
    uploadProductImage
}