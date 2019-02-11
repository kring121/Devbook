const express = require('express');
const posts = require('../controllers/postsController');
const users = require('../controllers/userController');
const views = require('../controllers/viewController');

const postsRouter = express.Router();
/* GET users listing. */
postsRouter.route('/')
  .post(users.verifyToken, posts.create, views.showPosts);

module.exports = postsRouter;
