const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromPhone: {
        type: Number,
        required: true,
    },
    toPhone: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    }
});

const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;