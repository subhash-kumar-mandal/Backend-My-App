
const express = require('express');
const { PostHandle,DeletePost } = require('./post.controller');
const {AuthUserCheck}= require('../../configs/authMD')
const postRoute = express.Router();
const upload = require('../../configs/multer.config');


postRoute.post('/create',AuthUserCheck,upload.single("image"),PostHandle);
postRoute.delete("/:postId",AuthUserCheck,DeletePost);



module.exports = postRoute;