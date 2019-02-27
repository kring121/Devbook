const { User, Profile, Like, Comment, Post } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      const { pic, bio, github, codepen, linkedin, website } = req.body;
      const user_id = req.userId;

      const newProfile = await Profile.create({
        pic, bio, github, codepen, linkedin, website, user_id
      })

      res.locals = newProfile;
      next()

    } catch(e) {
      next(e)
    }
  },
  async update(req, res, next) {
    try {
      const id = req.userId;
      const { pic, bio, github, codepen, linkedin, website } = req.body;
      const [, updatedProfile] = await Profile.update({
        pic, bio, github, codepen, linkedin, website
      }, {
        where: { id },
        limit: 1,
        rejectOnEmpty: true,
        returning: true,
      });
      res.locals = updatedProfile;
      next();
    } catch (e) {
      next(e);
    }
  },

  async destroy(req, res, next) {
    try {
      const user_id = req.userId;
      await Like.destroy({
        where: { user_id },
      });
      await Post.destroy({
        where: { user_id }
      });
      await Comment.destroy({
        where: { user_id }
      });
      await Profile.destroy({
        where: { user_id }
      });
      await User.destroy({
        where: { id: user_id }
      });
      next();
    } catch (e) {
      next(e);
    }
  },
}
