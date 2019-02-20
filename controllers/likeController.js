const { User, Like } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      res.locals = await Like.findAll({
        rejectOnEmpty: true,
      });
      next()
    } catch(e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const { post_id } = req.body;
      const user_id = req.userId;

      const newLike = await Like.create({
        user_id, post_id
      })

      res.locals = newLike;
      next()
    } catch(e) {
      next(e)
    }
  },

  async currentUserLike(req, res, next) {
    try {
      const user_id = res.locals.id;
      res.locals = await Like.findAll({
        where: {user_id}
      });
      next()
    } catch(e) {
      next(e);
    }
  },

  async destroy(req, res, next) {
    try {
      const post_id = Number.parseInt(req.params.id, 10);
      const user_id = req.userId;
      await Like.destroy({
        where: { post_id, user_id},
      });
      next();
    } catch (e) {
      next(e);
    }
  },
}
