const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRETEWORD = process.env.SECRETEWORD;
const HEADER_NAME = process.env.HEADER_NAME;

module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers[HEADER_NAME];        
        const decoded = await jwt.verify(token, SECRETEWORD);
        if(decoded){
            next();
        }else{
            res.redirect('/');
        }
    } catch (error) {
        res.redirect('/');
    } 
};