var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {});
  });
  app.get("/profile", function(req, res) {
    res.render("profile", {});
  });
  app.get("/home/:username", function(req, res) {
    if (req.session.loggedin) {
      res.render("home", {
        username: req.params.username,
        examples: []
      });
    } else {
      res.redirect("/");
    }
  });
  //=================
  app.get("/profile/:username", function(request, response) {
    var username = request.params.username;
    if (username) {
      db.User.findAll({
        where: {
          username: username
          // email: email
        }
      }).then(function(results) {
        if (results.length > 0) {
          response.redirect("/profile/"+ username);
        } else {
          response.redirect("/");
        }
      });
    } else {
      response.redirect("/");
    }
  });
  //===========
  //profile section
  app.get("/home/:username", function(req, res) {
    if (req.session.loggedin) {
      res.render("profile", {
        username: req.params.username,
        examples: []
      });
    } else {
      res.redirect("/");
    }
  });
  
  app.post("/auth", function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      db.User.findAll({
        where: {
          username: username,
          password: password
        }
      }).then(function(results) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home/"+ username);
        } else {
          response.redirect("/");
        }
      });
    } else {
      response.redirect("/");
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
