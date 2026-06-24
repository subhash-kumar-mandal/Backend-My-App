
const express = require('express');
const { PostHandle,DeletePost, PostLike } = require('./post.controller');
const {AuthUserCheck}= require('../../configs/authMD')
const postRoute = express.Router();
const upload = require('../../configs/multer.config');


postRoute.post('/create',AuthUserCheck,upload.single("image"),PostHandle);
postRoute.delete("/:postId",AuthUserCheck,DeletePost);
postRoute.get('/like/:postId',AuthUserCheck,PostLike)



module.exports = postRoute;