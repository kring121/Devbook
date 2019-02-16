const jwt = require('jsonwebtoken');

module.exports = {
  checkUser(req, res, next) {
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
          // res.json({
          //   id: authData.user.id,
          //   username: authData.user.username,
          //   name: authData.user.name,
          // })
          res.locals = {
            id: authData.user.id,
            username: authData.user.username,
            name: authData.user.name,
          }
          next()
        }
      })
    } else {
      res.sendStatus(403)
    }
  }
}
