const { User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      res.locals = await User.findAll({
        attributes: ['id', 'username', 'name'],
        rejectOnEmpty: true,
      });
      next()
    } catch(e) {
      next(e);
    }
  },
  async getOne(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      res.locals = await User.findOne({
        where: { id },
        rejectOnEmpty: true,
        attributes: ['id', 'username', 'name'],
      });
      next();
    } catch(e) {
      next(e);
    }
  },
  async create(req, res, next) {
    try {
      const { id, username, name} = req.body;

      const newUser = await User.create({
        id, username, name,
      });

      res.locals = newUser;

      next();
    } catch (e) {
      next(e);
    }
  },
}
