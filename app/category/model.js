const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        // require: [true, 'Nama kategori harus diisi']
    }
})

module.exports = Category = mongoose.model('Category', categorySchema);