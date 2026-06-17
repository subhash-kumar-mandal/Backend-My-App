const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        default: '',
        maxLength:100
    },
    image: {
        url: {
            type: String,
            default: ''
        },
        publicId: {
            type: String,
            default: ''
        }
    },
    height:{
        type:Number,
        required:true
    },
    width:{
        type:Number,
        required:true
    },

    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]

}, { timestamps: true });




module.exports =  mongoose.model('Post',postSchema)