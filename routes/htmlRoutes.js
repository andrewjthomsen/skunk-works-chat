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

        for (i in chatTable) {
          if (req.session.username === chatTable[i].User.username) {
            chatTable[i].authorShip = true;
          } else {
            chatTable[i].authorShip = false;
          }
        }

        res.render("home", {
          chatTB: chatTable
        });
      });

    } else {
      res.redirect("/");
    }
  });

  app.get("/signup", function (req, res) {
    res.render("register");
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
      // check if user && pass not null
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
          response.render("indexFail", {
            loggedInFailed: true
          });
        }
      });

    } else {
      // return to home when user and pass are null
      response.redirect("/");
    }
  });

  // logout
  app.get("/logout", function (req, res) {

    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        // cannot access session here
        if (err) {
          console.log(err);
        } else {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.redirect("/");
        }
      });
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
