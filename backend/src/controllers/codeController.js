const codeService = require('../services/codeService');
const userService = require('../services/userService');
const response = require('../utilities/response');

module.exports.createCodeByPhone = async (req, res) => {
    const { phone } = req.body;
    const exist = await userService.getUserByPhone(phone);
    if (!exist.status) {
        await codeService.deleteCodeByPhone(phone);
        const done = await codeService.createCodeByPhone(phone);
        return res.send(done);
    } else {       
        return res.send(response.getException('¡Este número telefónico ya está registrado!'));
    }
};

module.exports.verifyPhoneAndCode = async (req, res) => {
    const phone = req.params.phone;
    const code = req.params.code;
    const done = await codeService.verifyPhoneAndCode(phone, code);
    return res.send(done);
};

module.exports.getCodeByPhone = async (req, res) => {
    const phone = req.params.phone;
    const done = await codeService.getCodeByPhone(phone);
    return res.send(done);
};