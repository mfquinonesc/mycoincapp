const transactionModel = require('../models/transactionModel');
const response = require('../utilities/response');

module.exports.createTransaction = async (body) => {
    try {
        const date = new Date();
        const { fromPhone, toPhone, amount, description } = body;
        const transaction = await transactionModel.create({ fromPhone, toPhone, amount, date, description });
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

module.exports.getTransactionByPhone = async (phone) => {
    try {
        const arrFrom = await transactionModel.find({ fromPhone: phone });
        const arrTo = await transactionModel.find({ toPhone: phone });
        if (arrFrom && arrTo) {
            arrFrom.forEach((element) => {
                element.amount = Math.abs(element.amount) * (-1);
            });
            arrTo.forEach((element) => {
                element.amount = Math.abs(element.amount);
            });
            const arrPhone = arrFrom.concat(arrTo);
            return response.getSuccess(arrPhone);
        } else {
            return response.getUnknownException();
        }
    }
    catch (err) {
        return response.getError(err);
    }
};