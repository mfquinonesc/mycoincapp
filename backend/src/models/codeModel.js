const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    }
});

const codeModel = mongoose.model('code',codeSchema);
module.exports = codeModel;