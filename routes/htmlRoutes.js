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
        console.log("chat table here foo!");
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
  //=================
  app.get("/profile/:username", function(request, response) {
    var username = request.params.username;
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(results) {
      console.log(results);
      if (results) {
        response.render("profile", {
          username:results.username,
          email:results.email
        });
      } else {
        response.redirect("/");
      }
    });
<<<<<<< HEAD
    
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
=======
  });*/

  app.post("/auth", function (request, response) {
>>>>>>> 17279db63b5dfcecac4da4d55d57cae28e56c3a4
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
<<<<<<< HEAD
          response.redirect("/home/"+ username);
=======
          // stores userID to session data
          request.session.userId = results[0].dataValues.id;
          response.redirect("/home");
>>>>>>> 17279db63b5dfcecac4da4d55d57cae28e56c3a4
        } else {
          response.redirect("/");
        }
      });
    } else {
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
