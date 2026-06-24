
const express = require('express');
const { commentAdd, GetComments, DeleteComment } = require('./comments.controller');
const {AuthUserCheck} = require('../../configs/authMD')
const commentRoute = express.Router();



commentRoute.post('/:postId',AuthUserCheck,commentAdd);
commentRoute.get('/:postId',AuthUserCheck,GetComments);
commentRoute.get('/:postId/:deleteId',AuthUserCheck,DeleteComment);


module.exports = commentRoute