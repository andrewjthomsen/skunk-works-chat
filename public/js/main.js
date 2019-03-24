var socket = io();

var API = {
  getAllChat: function () {
    return $.ajax({
      url: "/api/chat/all",
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
  console.log("socket:");
  console.log(res);
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