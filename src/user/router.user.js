const express = require('express');
const { SignUp,LoginUser,  ImageHandle, LogoutUser } = require('./user.controller');
const {  AuthUserCheck} = require('../../configs/authMD');
const userRoute  = express.Router();

const upload = require('../../configs/multer.config')





userRoute.post('/signup',SignUp);
userRoute.post('/login',LoginUser);
userRoute.get("/logout",LogoutUser);

userRoute.patch('/profile-picture',AuthUserCheck,upload.single('avater') , ImageHandle)
module.exports = userRoute;