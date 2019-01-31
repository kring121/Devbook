var express = require('express');
const users = require('../controllers/userController');
const views    = require('../controllers/viewController');

const userRouter = express.Router();
/* GET users listing. */
userRouter.route('/')
  .get(users.index, views.showUsers)
  .post(users.create, views.showUsers)

userRouter.route('/:id')
  .get(users.getOne, views.showUser);

module.exports = userRouter;
