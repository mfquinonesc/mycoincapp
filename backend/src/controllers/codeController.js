const codeService = require('../services/codeService');

module.exports.createCodeByPhone = async (req, res) => {
    const { phone } = req.body;
    const response = await codeService.createCodeByPhone(phone);
    return res.send(response);
};

module.exports.getCodeByPhone = async (req, res) => {
    const phone = req.params.phone;
    const response = await codeService.getCodeByPhone(phone);
    return res.send(response);
};