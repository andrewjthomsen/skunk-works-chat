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
  },
  createUser: function (dataToSend) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/createuser/",
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
      // =================================================================
      // Adding code to send location/append location
        // if (!navigator.geolocation) {
        //   return alert("Geolocation is not supported by your browser.");
        // }
        // =============================================================
      // Code needs to be moved and reformated, but am placing it here until I figure out where it goes
      // io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
      // // ======================================================================
        // navigator.geolocation.getCurrentPosition(position => {
        //   socket.emit(
        //     "sendLocation",
        //     {
        //       latitude: position.coords.latitude,
        //       longitude: position.coords.longitude
        //     },
        //     () => {
        //       $sendLocationButton.removeAttribute("disabled");
        //       console.log("Location shared!");
        //     }
        //   );
        // });
      // ==================================================================================
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

  // form values
  var userName = $("#user-text").val().trim();
  var emailAdd = $("#email-text").val().trim();
  var emailAdVerify = $("#email-text2").val().trim();
  var pass = $("#pass-text").val().trim();
  var passVerify = $("#pass-text2").val().trim();

  // start validation below:


  // Enf of validatopn code

  // API call below:

  newUserData = {
    username: userName,
    email: emailAdd,
    password: pass
  };

  API.createUser(newUserData).then(function (res) {
    console.log(res);
    window.location = "/newuser";
  }).catch(function (err) {
    if (err === "Username or email exists.") {
      console.log("user already exists");
    }
    else {
      // something might have gone wrong with the request
      console.log("server error or something");
    }
  });

});