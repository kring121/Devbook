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
      const { content, post_id } = req.body;
      const user_id = req.userId;

      const newComment = await Comment.create({
        content, user_id, post_id
      })

      res.locals = newComment;
      next()

    } catch(e) {
      next(e)
    }
  },
  async getPostsComments(req, res, next) {
    try {
      const post_id = Number.parseInt(req.params.id, 10);
      res.locals = await Comment.findAll({
        where: { post_id },
        // rejectOnEmpty: true,
        include: [{model: User, attributes: ['id', 'username']}]
      });
      next();
    } catch(e) {
      next(e);
    }
  },
}
