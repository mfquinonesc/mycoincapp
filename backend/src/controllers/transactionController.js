const transactionService = require('../services/transactionService');
const userService = require('../services/userService');
const response = require('../utilities/response');

module.exports.createTransaction = async (req, res) => {
    const body = req.body;
    const { fromPhone, toPhone, amount } = body;
    const reciever = await userService.getUserByPhone(toPhone);
    const sender = await userService.getUserByPhone(fromPhone);
    if (reciever.status && sender.status) {
        if (sender.obj.budget >= Math.abs(amount)) {
            const userReciever = reciever.obj;
            const userSender = sender.obj;
            userReciever.budget = userReciever.budget + Math.abs(amount);
            userSender.budget = userSender.budget - Math.abs(amount);
            await userService.patchUserByPhone(toPhone, userReciever);
            await userService.patchUserByPhone(fromPhone, userSender);
            const done = await transactionService.createTransaction(body);
            return res.send(done);
        } else {
            return res.send(response.getException('¡Fondos insuficientes!'));
        }
    } else {
        return res.send(response.getException('¡No se puede realizar la transacción!'));
    }
};

module.exports.getTransactionByPhone = async (req, res) => {
    const phone = req.params.phone;
    const done = await transactionService.getTransactionByPhone(phone);
    return res.send(done);
};