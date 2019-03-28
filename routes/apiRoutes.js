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


  app.post("/api/createuser/", function (req, res) {
    db.User.findAll({
      where: {
        $or: [
          {
            username: req.body.username
          },
          {
            email: req.body.email
          }
        ]
      }
    }).then(function (users) {

      if (users > 0) {
        res.status(400).end("Username or email exists.");
        return;
      } else {
        db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }).then(function (createUser) {
          console.log(createUser);
          res.status(200).end();
        });
      }
    });
  });


  // update user's Info
  app.put("/api/user/update", function (req, res) {

    // check if user is logged in
    if (req.session.loggedin) {

      db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio
      }, {
        where: {
          id: req.session.userId
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


};
