module.exports = {
  showUsers(req, res) {
    res.json(res.locals);
  },

  showUser(req, res) {
    res.json(res.locals);
  },

  showPosts(req, res) {
    res.send(res.locals);
  }
}
