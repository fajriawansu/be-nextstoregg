const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama game harus diisi']
    },

    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },

    thumbnail: {
        type: String
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    nominals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nominal'
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Voucher = mongoose.model('Voucher', voucherSchema);