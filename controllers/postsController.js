const { User, Post } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      const { image, caption } = req.body;
      const user_id = req.userId;

      const newPost = await Post.create({
        image, caption, user_id
      })

      res.locals = newPost;
      next()

    } catch(e) {
      next(e)
    }
  }
}
