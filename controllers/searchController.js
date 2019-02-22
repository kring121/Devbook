const { User } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
  async searchUser(req, res, next) {
    try {
      const username = req.params.username;
      res.locals = await User.findAll({
        where: { username: { [Op.like]: username + '%' } },
        rejectOnEmpty: true,
        attributes: ['id', 'username', 'name'],
      });
      next();
    } catch(e) {
      next(e);
    }
  },
}
