const transactionModel = require('../models/transactionModel');
const response = require('../utilities/response');

module.exports.createTransaction = async (body) => {
    try {
        const date = new Date();
        const { fromPhone, toPhone, amount } = body;
        const transaction = await transactionModel.create({ fromPhone, toPhone, amount, date });
        if (transaction) {
            return response.getSuccess(transaction.id);
        } else {
            return response.getUnknownException();
        }
    }
    catch (err) {
        return response.getError(err);
    }
};