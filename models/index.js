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
    autoIncrement: true,
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
  },
  password: {
    type: Sequelize.STRING(16),
    allowNull: false,
    unique: false,
  },
  email: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
  }
});

const Post = db.define('post', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  image: {
    type: Sequelize.STRING(128),
    allowNull: true,
  },
  caption: {
    type: Sequelize.TEXT,
    allowNull: true,
  }
})

//associations

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  db,
  User,
  Post
}
