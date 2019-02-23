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
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  caption: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  link: {
    type: Sequelize.STRING(128),
    allowNull: true
  },
  github: {
    type: Sequelize.STRING(128),
    allowNull: true
  }
});

const Comment = db.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  content: {
    type: Sequelize.STRING(140),
    allowNull: false,
  }
});

const Like = db.define('like', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
});

//associations

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Post.hasMany(Like);
Like.belongsTo(Post);

module.exports = {
  db,
  User,
  Post,
  Comment,
  Like
}
