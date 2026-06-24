require('dotenv/config')

const userSchema = require('./user.model');
const verifySchema = require('../verify/verify.model')
const bcrypt = require('bcrypt');
const CustomError = require('../helpers/customError');
const JWT = require('jsonwebtoken');
const blocklist = new Set();
const postsSchema = require('../posts/post.modal')
const cloudinary = require('../../configs/cloudinary');
const userModel = require('./user.model');




async function SignUp(req, res, next) {
    try {
        const { email, password, userName } = req.body;

        if (!email?.trim().length || !password?.trim().length || !userName?.trim().length) {
            return next(new Error('all field are required', 400))
        };

        if (!email.endsWith('@gmail.com')) {
            return next(new Error('enter a valid email', 400));
        }

        const [existingUser, existingVerify, hashPassowrd] = await Promise.all([

            userSchema.findOne({ userName }),
            verifySchema.findOne({ email }),
            bcrypt.hash(password, 10)
        ]);




        if (existingUser?.email === email) {
            return next(new CustomError('something wront worng try agin differen email', 400))
        };

        if (existingUser) {
            return next(new CustomError('username already exists, try a unique username', 400));
        };


        if (!existingVerify) {
            return next(new CustomError('email not verified, please verify first', 400))
        };



        const user = await userSchema.insertOne({
            email, password: hashPassowrd, userName
        })

        res.status(201).json({
            success: true,
            message: 'signup is completed',
            user

        })

    }
    catch (err) {
        next(new CustomError(err))
    }
};



async function LoginUser(req, res, next) {
    try {
        const { identifier, password } = req.body;


        if (!identifier?.trim() || !password?.trim()) {
            return next(new CustomError('fill all fields', 400))
        }

        const userfilter = await userSchema.findOne({
            $or: [
                { userName: identifier },
                { email: identifier }
            ]
        });
        const id = userfilter._id

        

        if (!userfilter) {
            return next(new CustomError('enter vaild email & username', 400))
        }


        const MatchHashPassword = await bcrypt.compare(password, userfilter.password);

        if (!MatchHashPassword) {

            return next(new CustomError('Invaild Credentials..', 400))
        }


        const token = JWT.sign(
            { id: userfilter._id, text: process.env.NUMBER_MY },
            process.env.KEY_MY,
            { expiresIn: "24h" }
        );

         const posts = await postsSchema.find({authorId: id}).populate(
           "authorId",
           "userName firstName lastName displayPicture"
        )


        res.cookie('_token_', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        }).status(201).json({
            success: true,
            message: "login Succesfully",
            user: {...userfilter.toObject(),posts}

        });

    }
    catch (err) {
        next(err)
    }
};








async function LogoutUser(req, res) {
    try {

        const { _token_ } = req.cookies;


        res.cookie("_token_", "").status(200).json({
            success: true,
            message: "User logout succesfully"
        })

    } catch (err) {
        next(err)
    }
}





async function ImageHandle(req, res, next) {
    try {

        const id = req.userId;
        const user = await userModel.findById(id);

        if (!user || !req.file) {
            return next(new CustomError("something went wrong", 400))
        }

        if (user.displayPicture.publicId) {
            await cloudinary.uploader.destroy(
                user.displayPicture.publicId
            );
        };



        const image = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "displayPicture"
            }
        )

        user.displayPicture = {
            url: image.secure_url,
            publicId: image.public_id
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "",
            displayPicture: user.displayPicture
        })

    } catch (err) {
        next(err)
    }
};




// async function displayPictureDelete(req,res,delete)






module.exports = { SignUp, LoginUser, ImageHandle, LogoutUser }