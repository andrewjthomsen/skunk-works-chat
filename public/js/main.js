// define socket for realtime database check
var socket = io();

// API functions
var API = {

  getAllChat: function () {
    return $.ajax({
      url: "/api/chat/all",
      type: "GET"
    });
  },
  getOneChat: function (userID) {
    return $.ajax({
      url: "/api/chat/" + userID,
      type: "GET"
    });
  },
  sendChat: function (dataToSend) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/chat/send",
      type: "POST",
      data: JSON.stringify(dataToSend)
    });
  }
};

//listen to any `chat-sent` emit from socket io 
// then updated the content on the screen
socket.on("chat-sent", function (res) {
  console.log("chatID:");
  console.log(res.id);

  API.getOneChat(res.id).then(function (results) {
    var userClass = "user-two";

    if (results[0].authorShip) {
      userClass = "user-one";
    }


    $("#chatroom").append(
      "<div id='message-div' class=" + userClass + ">" +
      "<p class='font-weight-bold my-0 user'>" + results[0].User.username + "</p>" +
      "<p class='my-0'>" + results[0].message + "</p>"
    );

  });

});

// sent chat button event listener
$("#send-btn").on("click", function (e) {
  e.preventDefault();

  var user = {
    message: $("#message").val(),
  };

  API.sendChat(user).then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });

  $("#message").val("");

});

$("#signup-btn").on("click", function (e) {
  e.preventDefault();

  $.post("/api/createuser", {/* userData */ })
    .then(function (res) {
      console.log(res);
      window.location = "/home";
    })
    .catch(function (err) {
      if (err === "Username or email exists.") {
        console.log("user already exists");
      }
      else {
        // something might have gone wrong with the request
      }
    });

});