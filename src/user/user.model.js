const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true,
        default:''
    },
    lastName: {
        type: String,
        trim: true,
        default:''
    },

    DOB: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

    ],
    postsCount: {
     type:Number,
     default:0
    },
    displayPicture:{
        url:{
            type:String,
            default:''
        },
        publicId:{
            type:String,
            default:''
        }
    },
    bio:{
        type:String,
        maxlength:500,
        default:''
    },
    isCompletedProfile:{
        type:Boolean,
        default:false
    }

},{timestamps:true});


module.exports = mongoose.model("User",userSchema);
