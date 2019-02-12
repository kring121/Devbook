const express = require('express');
// const posts = require('../controllers/postsController');
// const users = require('../controllers/userController');
const comments = require('../controllers/commentController');
const views = require('../controllers/viewController');

const commentRouter = express.Router();
commentRouter.route('/')
  .get(comments.index, views.showComments)
  .post(comments.create, views.showComments);

module.exports = commentRouter;
