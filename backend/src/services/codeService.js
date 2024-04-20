const codeModel = require('../models/codeModel');
const response = require('../utilities/response');
const numgenerator = require('../utilities/numgenerator');

module.exports.createCodeByPhone = async (phone) => {
    try {
        const code = numgenerator.getCode();
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

module.exports.deleteCodeByPhone = async (phone) => {
    try {
        const codem = await codeModel.findOne({ phone: phone });
        if (codem) {
            await codeModel.findByIdAndDelete(codem.id);
            return response.getSuccess(codem.id);
        } else {
            return response.getException('¡Este número telefónico no está registrado!');
        }
    }
    catch (err) {
        return response.getError(err);
    }
};