
require('dotenv/config')
const CustomError = require('../helpers/customError');
const userModel = require('../user/user.model');
const cloudinary = require('../../configs/cloudinary');
const postSchema = require('./post.modal');
const mongoose = require('mongoose');



async function PostHandle(req, res, next) {
    try {
        const file = req.file;
        const id = req.userId
     
        
    
        if (!req.body?.caption?.trim()) {
            return next(new CustomError('Capation', 400));
        };

        if (!file) {
            return next(new CustomError('Image is required', 400));
        };

        const image = await cloudinary.uploader.upload(
            file.path,
            {
                folder: "posts"
            }
        );
      
        

        const user = await userModel.findById(id);


        const post = await postSchema.insertOne({
            authorId: user._id,
            caption: req.body.caption,
            image: {
                url: image.secure_url,
                publicId: image.public_id
            },
            height:image.height,
            width:image.width
        });
      
        const postInfo = await post.populate(
            "authorId",
            "userName firstName lastName displayPicture"
        )

        await userModel.findByIdAndUpdate(
            id,
            {
                $inc: {
                    postsCount: 1
                }
            }
        );









        res.status(201).json({
            success: true,
            message: "Post Upload Succesfully",
            post :postInfo
        })

    } catch (err) {
        next(err)
    }
};


async function DeletePost(req, res, next) {

    try {



        const id = req.userId;
        const { postId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
            return next(new CustomError("Something went wrong", 400));
        };
        

        const post = await postSchema.findById(postId);

       

        if (post.authorId.toString() !== id.toString()) {
            return next(new CustomError("Unauthorized", 401))
        }


        if (!post) {
            return next(new CustomError("Post not found", 404));
        }


        await Promise.all([
            cloudinary.uploader.destroy(post.image.publicId),
            userModel.findByIdAndUpdate(
                id,
                {
                    $inc: {
                        postsCount: -1
                    }
                }
            ),
            postSchema.findOneAndDelete(postId)

        ])

        res.status(200).json({
            success: true,
            message: "Post delete successfully"
        })



    }
    catch (err) {
        next(err)
    }
}





module.exports = { PostHandle, DeletePost }