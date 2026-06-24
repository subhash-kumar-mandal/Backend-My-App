const CustomError = require("../helpers/customError");
const userModel = require("../user/user.model");

const postSchema = require('../posts/post.modal')

const commentSchema = require("./comment.model")







const commentAdd = async (req, res, next) => {

    try {
        const { text } = req.body;
        const userId = req.userId;
        const { postId } = req.params;


        if (!text?.trim() || !postId) {
            return next(new CustomError("Enter a comment", 400));
        };


        const [userfind, postfind] = await Promise.all([
            userModel.findById(userId),
            postSchema.findById(postId)
        ]);


        const createComment = await commentSchema.insertOne({
            text: text,
            authorId: userfind._id,
            postId: postfind._id
        });

        const comment = await commentSchema
            .findById(createComment._id)
            .populate(
                "authorId",
                "userName displayPicture"
            );


        postfind.comments.push(createComment._id);
        await postfind.save();

        const post = await postSchema
            .findById(postfind._id)
            .populate(
                "authorId",
                "userName firstName lastName displayPicture"
            );

        res.status(200).json({
            success: true,
            post: post, createComment: comment
        })

    }
    catch (err) {
        next(err)
    }
};



const GetComments = async (req, res, next) => {

    try {

        const { postId } = req.params;

        if (!postId) {
            return next(new CustomError("Post is not found", 400))
        }

        const post = await postSchema.findById(postId)
            .populate(
                "authorId",
                "userName displayPicture"
            )
            .sort({
                createdAt: -1
            })
            .populate({
                path: "comments",
                populate: {
                    path: "authorId",
                    select: "userName displayPicture"
                }
            })
        console.log(post)

        res.json({
            success: true,
            post
        })

    }
    catch (err) {
        next(err)
    }
}



async function DeleteComment(req, res, next) {
    try {

        const userId = req.userId;
        const { postId, deleteId } = req.params;


        if (!postId || !deleteId) return next(new CustomError("Post is not found", 400));

        const comment = await commentSchema.findById(deleteId);


        if (comment.authorId.toString() !== userId) {
            return next(
                new CustomError("Unauthorized", 403)
            );
        }

        const [deletecomment, postUpdate] = await Promise.all([
            commentSchema.findByIdAndDelete(deleteId),
            postSchema.findByIdAndUpdate(
                postId,
                {
                    $pull: {
                        comments: deleteId
                    }
                },
                {
                    new: true
                }
            )

        ])


        const post = await postSchema
            .findById(postUpdate._id)
            .populate(
                "authorId",
                "userName firstName lastName displayPicture"
            );





        res.status(201).json({
            success: true,
            message: "delete succesfully comment",
            delete: deletecomment,
            post: post
        })


    } catch (err) {
        next(err)
    }
}


module.exports = { commentAdd, GetComments, DeleteComment }