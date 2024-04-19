const codeModel = require('../models/codeModel');
const response = require('../utilities/response');
const numGenerator = require('../utilities/numGenerator');

module.exports.createCodeByPhone = async (phone) => {
    try {
        const code = numGenerator.getCode();
        const date = new Date();
        const ncodem = await codeModel.create({ code, date, phone });
        if (ncodem) {
            return response.getSuccess(ncodem);
        } else {
            return response.getUnknownException();
        }
    }
    catch (err) {
        return response.getError(err);
    }
};

module.exports.getCodeByPhone = async (phone) => {
    try {
        const codem = await codeModel.findOne({ phone: phone });
        if (codem) {
            return response.getSuccess(codem);
        } else {
            return response.getException('¡Este número telefónico no está registrado!');
        }
    }
    catch (err) {
        return response.getError(err);
    }
};