var db = require("../models");

module.exports = function (app, io) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // start of chat app below, code above this are just for reference
  // they are not being used by the actual app - Darren

  // get all chat history from all users
  app.get("/api/chat/all", function (req, res) {

    db.Chat.findAll({
      include: [db.userInfo]
    }).then(function (chatTB) {
      console.log(chatTB);
      res.json(chatTB);
    });
  });

  // get all chat from user
  app.get("/api/chat/:chatID", function (req, res) {

    db.Chat.findAll({
      include: [db.userInfo],
      where: {
        id: req.params.chatID
      }
    }).then(function (chatTB) {
      res.json(chatTB);
    });

  });

  // get all userInfo
  app.get("/api/userinfo/all", function (req, res) {

    db.userInfo.findAll({
      include: [db.Chat]
    }).then(function (userInfoTB) {
      res.json(userInfoTB);
    });

  });

  // post a chat
  app.post("/api/chat/send", function (req, res) {

    console.log(req.body);
    console.log(req.session.userId);

    db.Chat.create({
      message: req.body.message,
      userInfoId: req.session.userId,
    }).then(function (chatDB) {
      console.log(chatDB);
      io.emit("chat-sent", chatDB);
      res.json(chatDB);
    });
  });

};
