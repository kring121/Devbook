const { User, Comment } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      res.locals = await Comment.findAll({
        rejectOnEmpty: true,
      });
      next()
    } catch(e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const { content, user_id, post_id } = req.body;
      // const user_id = req.userId;

      const newComment = await Comment.create({
        content, user_id, post_id
      })

      res.locals = newComment;
      next()

    } catch(e) {
      next(e)
    }
  },
}
