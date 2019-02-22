const express = require('express');
const search = require('../controllers/searchController');
const views = require('../controllers/viewController');

const searchRouter = express.Router();
searchRouter.route('/:username')
  .get(search.searchUser, views.showUsers)

module.exports = searchRouter;
