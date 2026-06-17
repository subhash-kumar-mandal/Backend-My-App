require('dotenv/config')

const customError = require('../helpers/customError')
const validator = require('validator')
const JWT = require('jsonwebtoken');
const userModel = require('../user/user.model');
const postSchema  = require('../posts/post.modal')

const ProfileFill = async (req, res, next) => {

    try {
        const { firstName, lastName, DOB, gender } = req.body;

        const userId = req.userId

        if (!firstName?.trim() || !lastName?.trim() || !DOB?.trim()) {
            return next(new customError("enter all feild", 400))
        };

        if (!validator.isDate(DOB)) {
            return next(new customError('enter vaild DOB', 400))
        };




        if (!userId) {
            return next(new customError('User is Not Found', 400))
        }
        const user = await userModel.findById(userId)
        user.firstName = firstName;
        user.lastName = lastName;
        user.DOB = DOB;
        user.gender = gender;



        await user.save()

        res.json({
            user
        })

    }
    catch (err) {

        next(err)
    }
};



const ProfileEdit = async (req, res, next) => {

    try {
        const { firstName, lastName, DOB, gender, displayPicture, bio } = req.body;

        const userId = req.userId

        if (!firstName?.trim() || !lastName?.trim() || !DOB?.trim()) {
            return next(new customError("enter all feild", 400))
        };

        if (!validator.isDate(DOB)) {
            return next(new customError('enter vaild DOB', 400))
        };




        if (!userId) {
            return next(new customError('User is Not Found', 400))
        }
        const user = await userModel.findById(userId)
        user.firstName = firstName;
        user.lastName = lastName;
        user.DOB = DOB;
        user.gender = gender;



        await user.save()

        res.json({
            user
        })

    }
    catch (err) {

        next(err)
    }
};



const UserDataGive = async (req, res, next) => {
    try {

        const id = req.userId;

        const user = await userModel.findById(id).select('-password -updatedAt -createdAt -__v');
        
        const posts = await postSchema.find({authorId: id}).populate(
   "authorId",
   "userName firstName lastName displayPicture"
)
        

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "usef is not found"
            })
        }

        return res.status(201).json({
            success: true,
            user:{...user.toObject(),posts}
        })



    }
    catch (err) {
        next(err)
    }
}




module.exports = { ProfileFill, ProfileEdit,UserDataGive }