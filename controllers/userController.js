const { User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      res.locals.users = await User.findAll({
        attributes: ['id', 'username', 'name'],
        rejectOnEmpty: true,
      });
      next()
    } catch (e) {
      next(e);
    }
  }
}
