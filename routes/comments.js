const express = require('express');
// const posts = require('../controllers/postsController');
const users = require('../controllers/userController');
const comments = require('../controllers/commentController');
const views = require('../controllers/viewController');

const commentRouter = express.Router();
commentRouter.route('/')
  .get(comments.index, views.showComments)
  .post(users.verifyToken, comments.create, views.showComments);

commentRouter.route('/:id')
  .get(comments.getPostsComments, views.showComments)

module.exports = commentRouter;
