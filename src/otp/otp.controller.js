require('dotenv/config');

const nodemailer = require('nodemailer');

const { getOtpEmailHtml } = require('../helpers/helper');
const otpSchema = require('./otp.model'); // otp model
const verifySchema = require('../verify/verify.model') // verify model
const { Resend } = require('resend');
const customError = require("../helpers/customError");
const sendEmail = require('../helpers/emailhandle');

const rend = new Resend(process.env.RESEND_KEY);

async function OTPSEND(req, res, next) {
    try {
        const { email } = req.body;


        if (!email?.trim() || !email.endsWith('@gmail.com')) {
            return next(new customError('Enter Vaild email', 400))
        };

        const verifyEmailFlag = await verifySchema.findOne({ email });

        if (verifyEmailFlag) {
            return next(new customError('Enter a different Email and try again', 400))
        }

        const otpcreate = Math.floor(Math.random() * 1000000);


        const findOTP = await otpSchema.findOne({ email });

        if (findOTP) {

            
            await sendEmail(email, findOTP.otp)

            return res.status(201).json({
                success: true,
                message: 'otp sent Succsfully'
            })

        };

      

        const otps = await otpSchema.create(
            { email, otp: otpcreate }
        );



        await otps.save();


        await sendEmail(email, otpcreate)


        return res.status(200).json({
            success: true,
            message: 'otp sent Succsfully'
        })


    } catch (err) {
        next(err)
    }
};




async function VerifyOTP(req, res, next) {
    try {
        const { email, otp } = req.body;
      
        const Emial_OTP = await otpSchema.findOne({ email });



        
        if (!Emial_OTP) {
            
            await otpSchema.deleteOne({otp})

            return res.status(400).json({
                success: false,
                message: "Your  OTP is expired"
            })
        };

        if (email !== Emial_OTP.email) {
            return next(new customError('email is not match', 400))
        }

        if (Number(Emial_OTP.otp) !== Number(otp)) {
            return res.status(400).json({
                success: false,
                message: "OTP is not Match"
            })
        };



        await verifySchema.insertOne({ email });
        await otpSchema.deleteOne({ email });
        return res.status(200).json({
            success: true,
            message: "Verify is Succesfully"
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}






module.exports = { OTPSEND, VerifyOTP };