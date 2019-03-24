var socket = io();

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

socket.on("chat-sent", function (res) {
  console.log("chatID:");
  console.log(res.id);

  API.getOneChat(res.id).then(function (results) {
    $("#message-div").append("<h4>" + results[0].userInfo.firstName + "</h4><p>" + results[0].message + "</p>");
  });


});

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



});