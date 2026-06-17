const express = require('express');
const handleOTPs  = express.Router();

const {OTPSEND, VerifyOTP} = require('./otp.controller');

handleOTPs.post('/send',OTPSEND);
handleOTPs.post('/verify',VerifyOTP)




module.exports = handleOTPs