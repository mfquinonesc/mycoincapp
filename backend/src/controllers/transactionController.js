const transactionService = require('../services/transactionService');
const userService = require('../services/userService');
const response = require('../utilities/response');

module.exports.createTransaction = async (req, res) => {
    const body = req.body;
    const { fromPhone, toPhone, amount } = body;
    const reciver = await userService.getUserByPhone(toPhone);
    const sender = await userService.getUserByPhone(fromPhone);
    if (reciver.status && sender.status) {
        if (sender.obj.budget > Math.abs(amount)) {
            const userReciver = reciver.obj;
            const userSender = sender.obj;
            userReciver.budget + Math.abs(amount);
            userSender.budget - Math.abs(amount);
            await userService.patchUserByPhone(toPhone, userReciver);
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