const mongoose = require('mongoose');
const Product = require('./Product');

const ReviewSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, 'Please provide rating']
        },
        title: {
            type: String,
            trim: true,
            required: [true, 'Please provide review title'],
            maxlength: 1000
        },
        comment: {
            type: String,
            required: [true, 'Please provide review text']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true
        }
    },
    { timestamps: true }
);

ReviewSchema.index(
    { product: 1, user: 1 },
    { unique: true }
);

ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: null,                               // or it can be '$product' || '$rating' if I want to group by rating 5:2, 1:1 etc.
                averageRating: { $avg: '$rating' },
                numOfReviews: { $sum: 1 }
            }
        }
    ]);

    try {
        await this.model('Product').findOneAndUpdate(
            { _id: productId },
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0),
                numOfReviews: result[0]?.numOfReviews || 0
            }
        )
    } catch (error) {
        console.log(error);
    }

}

ReviewSchema.post('save', async function () {       // called both by create & update
    console.log('post save hook called.');
    await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post('remove', async function () {
    console.log('post remove hook called.');
    await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);