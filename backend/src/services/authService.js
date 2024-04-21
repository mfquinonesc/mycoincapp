const userModel = require('../models/userModel');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const response = require('../utilities/response');
const jwt = require("jsonwebtoken");

dotenv.config();

const SECRETEWORD = process.env.SECRETEWORD;
const HEADER_NAME = process.env.HEADER_NAME;

module.exports.signIn = async (body) => {
    try {
        const { phone, password } = body;
        const user = await userModel.findOne({ phone: phone });
        if (user) {
            const isLogin = await bcrypt.compareSync(password, user.password);
            if (isLogin) {
                const token = jwt.sign(user.id, SECRETEWORD);
                return response.getSuccess(token);
            } else {
                return response.getException('¡La contraseña es incorrecta!');
            }
        } else {
            return response.getException('¡Este número telefónico no está resgistrado!');
        }
    }
    catch (err) {
        return response.getError(err);
    }
};

module.exports.signUp = async (body) => {
    try {
        const { firstName, lastName, phone, email, password, budget, docType, identification } = body;
        const user = await userModel.create({ firstName, lastName, phone, email, password, budget, docType, identification });
        if (user) {
            const token = jwt.sign(user.id, SECRETEWORD);
            return response.getSuccess(token);
        } else {
            return response.getUnknownException();
        }
    }
    catch (err) {
        return response.getError(err);
    }
};

module.exports.verify = async (headers) => {
    try {
        const token = headers[HEADER_NAME];
        const decoded = await jwt.verify(token, SECRETEWORD);
        if (decoded) {
            return response.getSuccess(true);
        } else {
            return response.getException(false);
        }
    } catch (error) {
        return response.getError(false);
    }
}