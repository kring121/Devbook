const { User, Profile } = require('../models');

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
  }
}
