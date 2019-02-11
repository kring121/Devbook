const express = require('express');
const users = require('../controllers/userController');
const views    = require('../controllers/viewController');

const userRouter = express.Router();
/* GET users listing. */
userRouter.route('/')
  .get(users.verifyToken, users.index, views.showUsers)
  .post(users.create, views.showUsers)

userRouter.route('/:id')
  .get(users.verifyToken, users.getOne, views.showUser);

userRouter.route('/login')
  .post(users.login, views.showUser);

module.exports = userRouter;
