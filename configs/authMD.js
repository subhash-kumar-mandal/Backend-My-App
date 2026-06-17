require('dotenv/config')
const CustomError = require("../src/helpers/customError");
const JWT = require('jsonwebtoken');
const userModel = require('../src/user/user.model');




async function AuthUserCheck(req, res, next) {
    try {
        const token = req.cookies._token_;
        

        if (!token) {
            return next(new CustomError('Token is not found', 400));
        };

        const verifyToken = JWT.verify(token, process.env.KEY_MY);

        req.userId = verifyToken.id;
        next()

    }
    catch (err) {

        if (err.name === "TokenExpiredError") {
            return next(new CustomError('token Expired', 401))
        };



        next(err)
    }
}


module.exports = {  AuthUserCheck }