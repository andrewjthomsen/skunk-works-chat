var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/home/:username", function(req, res) {
    db.User.findOne({where: { username: req.params.username } }).then(function(dbUser) {
      var username = req.params.username;
      res.json(dbUser);
      console.log(dbUser);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
