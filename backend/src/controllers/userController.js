const userService = require('../services/userService');

module.exports.createUser = async (req, res) => {
    const body = req.body;
    const done = await userService.createUser(body);
    return res.send(done);
};

module.exports.getUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    const done = await userService.getUserByPhone(phone);
    return res.send(done);
};

module.exports.patchUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    const body = req.body;
    const done = userService.patchUserByPhone(phone, body);
    return res.send(done);
};