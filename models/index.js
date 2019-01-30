const Sequelize = require('sequelize');

const db = new Sequelize({
  database: 'fullstack-app',
  dialect:  'postgres',
  define: {
    underscored: true,
    returning: true,
  },
});

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: Sequelize.STRING(16),
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique: false,
  }
});

module.exports = {
  db,
  User,
}
