const codeService = require('../services/codeService');

module.exports.createCodeByPhone = async (req, res) => {
    const { phone } = req.body;
    await codeService.deleteCodeByPhone(phone);
    const done = await codeService.createCodeByPhone(phone);
    return res.send(done);
};

module.exports.getCodeByPhone = async (req, res) => {
    const phone = req.params.phone;
    const done = await codeService.getCodeByPhone(phone);
    return res.send(done);
};