const express = require('express');
const users = require('../controllers/userController');
const likes = require('../controllers/likeController');
const views = require('../controllers/viewController');

const likeRouter = express.Router();
likeRouter.route('/')
  .get(likes.index, views.showLikes)
  .post(users.verifyToken, likes.create, views.showLikes);

likeRouter.route('/:id')
  .delete(users.verifyToken, likes.destroy, views.showLikes);

module.exports = likeRouter;
