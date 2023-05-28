const mongoose = require('mongoose');

const ValuesSchema = new mongoose.Schema({
    date: String,
    value: Number
});


module.exports = mongoose.model('Values', ValuesSchema);