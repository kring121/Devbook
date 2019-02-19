const express = require('express');
// const posts = require('../controllers/postsController');
const users = require('../controllers/userController');
const current = require('../controllers/currentController');
const likes = require('../controllers/likeController');
const views = require('../controllers/viewController');

const currentRouter = express.Router();
currentRouter.route('/')
  .get(current.checkUser, views.currentUser);

currentRouter.route('/likes')
  .get(current.checkUser, likes.currentUserLike, views.showLikes)

module.exports = currentRouter;
