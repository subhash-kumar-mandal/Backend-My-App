
const express = require('express');
const { ProfileFill,UserDataGive } = require('./profile.controller');
const profileRoute  = express.Router();
const {AuthUserCheck} = require('../../configs/authMD')

profileRoute.use(AuthUserCheck);
profileRoute.put('/fill',ProfileFill);
profileRoute.get('/data',UserDataGive)




module.exports = profileRoute