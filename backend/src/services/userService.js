const userModel = require('../models/userModel');
const response = require('../utilities/response');

module.exports.createUser = async (body) => {
    try {
        const { firstName, lastName, phone, email, password, budget } = body;
        const user = await userModel.create({ firstName, lastName, phone, email, password, budget });
        if (user) {
            return response.getSuccess(user.id);
        } else {
            return response.getUnknownException();
        }
    }
    catch (err) {
        return response.getError(err);
    }
};

module.exports.getUserByPhone = async (phone) => {
    try {
        const user = await userModel.findOne({ phone: phone });
        if (user) {
            return response.getSuccess(user);
        } else {
            return response.getException('¡Este número telefónico no esta registrado!');
        }
    }
    catch (err) {
        return response.getError(err);
    }
};

module.exports.patchUserByPhone = async (phone, body) => {
    try {
        const user = await userModel.findOne({ phone: phone });
        if (user) {
            const { firstName, lastName, budget } = body;
            const uuser = await userModel.findByIdAndUpdate(user.id, { firstName, lastName, budget }, { returnDocument: 'after' });
            return response.getSuccess(uuser.phone);
        } else {
            return response.getException('¡Este número telefónico no esta registrado!');
        }
    } catch (err) {
        return response.getError(err);
    }
};