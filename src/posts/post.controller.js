
require('dotenv/config')
const CustomError = require('../helpers/customError');
const userModel = require('../user/user.model');
const cloudinary = require('../../configs/cloudinary');
const postSchema = require('./post.modal');
const mongoose = require('mongoose');

const commentSchema = require('../comments/comment.model');


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
            height: image.height,
            width: image.width
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
            post: postInfo
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
            postSchema.findOneAndDelete(postId),
            commentSchema.deleteMany({
                postId: post._id
            })

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



async function PostLike(req, res, next) {
    try {

        const userId = req.userId;
        const { postId } = req.params;


        

        const postFind = await postSchema.findById(postId);


        if (!postFind) return next(new CustomError("Post is not Found", 400));

        const alreadyLiked = postFind.likes.some(
            id => id.toString() === userId
        );

        if (alreadyLiked) {
            postFind.likes.pull(userId);
        } else {
            postFind.likes.push(userId);
        }

        await postFind.save();

        const post = await postSchema
                    .findById(postFind._id)
                    .populate(
                        "authorId",
                        "userName firstName lastName displayPicture"
                    );
        

        res.status(201).json({
            success:true,
            message:"Like ya disLike successFully",
            post:post
        })

    } catch (err) {
        next(err)
    }
}




module.exports = { PostHandle, DeletePost, PostLike }