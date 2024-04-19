const userService = require('../services/userService');

module.exports.createUser = async (req, res) => {
    const body = req.body;
    const response = await userService.createUser(body);
    return res.send(response);
};

module.exports.getUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    const response = await userService.getUserByPhone(phone);
    return res.send(response);
};

module.exports.patchUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    const body = req.body;
    const response = userService.patchUserByPhone(phone, body);
    return res.send(response);
};