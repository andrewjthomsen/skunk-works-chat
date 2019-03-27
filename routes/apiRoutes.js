var db = require("../models");

module.exports = function (app, io) {


  // ---------- Chat API --------------------
  // get all chat history from all users
  app.get("/api/chat/all", function (req, res) {

    // check if user is logged in
    if (req.session.loggedin) {

      db.Chat.findAll({
        include: [db.User]
      }).then(function (chatTB) {
        console.log(chatTB);
        res.json(chatTB);
      });

    } else {
      // return to index if not
      res.redirect("/");
    }


  });

  // get all chat from user
  app.get("/api/chat/:ChatID", function (req, res) {

    // check if user is logged in
    if (req.session.loggedin) {

      db.Chat.findAll({
        include: [db.User],
        where: {
          id: req.params.ChatID
        }
      }).then(function (chatTB) {
        res.json(chatTB);
      });

    } else {
      // return to index if not
      res.redirect("/");
    }



  });

  // post a chat
  app.post("/api/chat/send", function (req, res) {

    console.log(req.body);
    console.log(req.session.userId);

    // check if user is logged in
    if (req.session.loggedin) {

      db.Chat.create({
        message: req.body.message,
        UserId: req.session.userId,
      }).then(function (chatDB) {
        console.log(chatDB);
        io.emit("chat-sent", chatDB);
        res.json(chatDB);
      });

    } else {
      // return to index if not
      res.redirect("/");
    }


  });

  // ---------- User API --------------------
  // get all user
  app.get("/api/user/all", function (req, res) {

    if (req.session.loggedin) {

      db.User.findAll({
        include: [db.Chat]
      }).then(function (userInfoTB) {
        res.json(userInfoTB);
      });

    } else {
      // return to index if not
      res.redirect("/");
    }



  });

  // get user by ID
  app.get("/api/user/:id", function (req, res) {

    // check if user is logged in
    if (req.session.loggedin) {

      db.User.findAll({
        where: {
          id: req.params.id
        },
        include: [db.Chat]
      }).then(function (userTB) {
        res.json(userTB);
      });

    } else {
      // return to index if not
      res.redirect("/");
    }


  });

  // check if user with this username already exist
  // returns an array.length of 0 if user does not exist
  app.get("/api/verify/username/:username", function (req, res) {

    db.User.findAll({
      where: {
        username: req.params.username
      }
    }).then(function (userTB) {
      res.json(userTB);
    });

  });

  // check if user with this email already exist
  // returns an array.length of 0 if user does not exist
  app.get("/api/verify/email/:email", function (req, res) {

    db.User.findAll({
      where: {
        email: req.params.email
      }
    }).then(function (userTB) {
      res.json(userTB);
    });

  });

  // update user's Info
  app.put("/api/user/:id", function (req, res) {

    // check if user is logged in
    if (req.session.loggedin) {

      db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio
      }, {
        where: {
          id: req.params.id
        },
        returning: true
      }).then(function (userTB) {
        res.json(userTB);
      });

    } else {
      // return to index if not
      res.redirect("/");
    }

  });
  // app.get("/api/home/:username", function(req, res) {
  //   db.User.findOne({where: { username: req.params.username } }).then(function(dbUser) {
  //     var username = req.params.username;
  //     res.json(dbUser);
  //     console.log(dbUser);
  //   });
  // });

};
