const authService = require('../services/authService');

module.exports.signIn = async (req, res) => {
    const done = await authService.signIn(req.body);
    return res.send(done);
};

module.exports.verify = async (req, res) => {
    const done = await authService.verify(req.headers);
    return res.send(done);
};