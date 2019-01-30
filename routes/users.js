var express = require('express');
const users = require('../controllers/userController');
const views    = require('../controllers/viewController');

const userRouter = express.Router();
/* GET users listing. */
userRouter.route('/')
  .get(users.index, views.showUsers);

module.exports = userRouter;
