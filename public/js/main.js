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
    $("#message-div").append("<p class='font-weight-bold my-0'>" + results[0].User.firstName + "</h4><p class='my-0'>" + results[0].message + "</p>");
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
