const routes = require('express').Router();
const transactionController = require('../controllers/transactionController');

routes.post('', transactionController.createTransaction);

module.exports = routes;