var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {});
  });

  app.get("/home", function (req, res) {
    if (req.session.loggedin) {
      db.Chat.findAll({
        include: [db.User],
      }).then(function (chatTable) {
        console.log(chatTable);
        res.render("home", {
          chatTB: chatTable
        });
      });

    } else {
      res.redirect("/");
    }
  });

  app.get("/hometest", function (req, res) {
    if (req.session.loggedin) {
      db.User.findAll({}).then(function (userTable) {
        res.render("homeTest", {
          userTB: userTable
        });
      });

    } else {
      res.redirect("/");
    }
  });

  /*
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });*/

  app.post("/auth", function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      db.User.findAll({
        where: {
          username: username,
          password: password
        }
      }).then(function (results) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          // stores userID to session data
          request.session.userId = results[0].dataValues.id;
          response.redirect("/home");
        } else {
          response.redirect("/");
        }
      });
    } else {
      response.redirect("/");
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
