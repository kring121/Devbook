const { User, Post } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      res.locals = await Post.findAll({
        // rejectOnEmpty: true,
        include: [{model: User, attributes: ['id', 'username', 'name']}],
        required: false
      });
      next()
    } catch(e) {
      next(e);
    }
  },
  async create(req, res, next) {
    try {
      const { image, caption, link, github } = req.body;
      const user_id = req.userId;

      const newPost = await Post.create({
        image, caption, user_id, link, github
      })

      res.locals = newPost;
      next()

    } catch(e) {
      next(e)
    }
  },

  async destroy(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      await Post.destroy({
        where: { id },
      });
      next();
    } catch (e) {
      next(e);
    }
  },

}
