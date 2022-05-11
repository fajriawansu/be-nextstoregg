const mongoose = require('mongoose');

const nominalSchema = new mongoose.Schema({
    coinQuantity: {
        type: Number,
        default: 0
    },
    coinName: {
        type: String,
        required: [true, 'nama koin harus diisi']
    },
    price: {
        type: Number,
        default: 0
    }
})

module.exports = Nominal = mongoose.model('Nominal', nominalSchema);