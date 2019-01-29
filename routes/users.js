var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username: 'kring121'},
    {id: 2, username: 'judybear'},
    {id: 3, username: 'lillybus'},
  ]);
});

module.exports = router;
