const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res, next) {
    try {
      res.locals = await User.findAll({
        attributes: ['id', 'username', 'name'],
        rejectOnEmpty: true,
      });
      next()
    } catch(e) {
      next(e);
    }
  },
  async getOne(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      res.locals = await User.findOne({
        where: { id },
        rejectOnEmpty: true,
        attributes: ['id', 'username', 'name'],
      });
      next();
    } catch(e) {
      next(e);
    }
  },
  async create(req, res, next) {
    try {
      const { id, username, name, email, password} = req.body;

      const newUser = await User.create({
        id, username, name, email, password
      });

      res.locals = newUser;

      next();
    } catch (e) {
      next(e);
    }
  },

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      user = await User.findOne({
        where: { username, password },
        rejectOnEmpty: true,
        attributes: ['id', 'username', 'name', 'password', 'email'],
      })
      jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
          token
        });
      });
    } catch (e) {
      // next(e);
      res.send('Cant find user')
    }
  },

  verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader != 'undefined') {
      //bearerHeader looks like = Bearer <access_token>
      // split bearer token at the space
      const bearer = bearerHeader.split(' ');
      //assigning bearer token from the bearer array
      const bearerToken = bearer[1];
      //set token
      req.token = bearerToken;

      //Now we are verifying the token and if it doesn't match our secretkey
      //we will send 403, else call next middleware function!
      jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
          res.sendStatus(403)
        } else {
          // if testing on Postman use req.userId = authData.user
          // if testing with React user req.userId = authData.user.id
          req.userId = authData.user.id
          next()
        }
      })
    } else {
      res.sendStatus(403)
    }
  },
}
