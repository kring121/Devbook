const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const session = require('express-session');


//Routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const likeRouter = require('./routes/likes');
const currentRouter = require('./routes/current');
const searchRouter = require('./routes/search');
const profileRouter = require('./routes/profile');


const app = express();
const PORT = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({
  secret: 'superserialsecret',
  resave: true,
  saveUninitialized: false
}));


//Router uses
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentRouter);
app.use('/likes', likeRouter);
app.use('/check', currentRouter);
app.use('/search', searchRouter);
app.use('/profile', profileRouter);

// Send all react router requests to client
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`Server up and listening on port ${PORT}, in ${app.get('env')}`));

module.exports = app;
