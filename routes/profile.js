const express = require('express');
const users = require('../controllers/userController');
const profiles = require('../controllers/profileController');
const views    = require('../controllers/viewController');

const profileRouter = express.Router();

profileRouter.route('/')
  .post(users.verifyToken, profiles.create, views.showUsers);

module.exports = profileRouter;
