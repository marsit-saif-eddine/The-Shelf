const app = require("./app.js");
const http = require("http");
const server = http.createServer(app);
const socketService = require("./services/socket/socket");
const jwt = require("jsonwebtoken");
const chatController = require("./controllers/chat-management/chat-controller.js");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
server.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

// +//videoconference//

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
//end video confrence

// exports.io = require("socket.io")(server, {
//     cors: {
//       origin: "*",
//     }
//   });

// WAJIH'S CODE

let currentSocket;

io.use((socket, next) => {
  try {
    let token = socket.handshake.auth.token;
    if (token) {
      token = token.replace(`"`, "");
      token = token.replace(`"`, "");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("UNAUTHORIZED");
      }
      socket.user = decoded;
      next();
    });
  } catch (ex) {}
}).on("connect", (socket) => {
  socket.on("club-message-sent", (data) => {
    data.creation_date = new Date();
    io.to(data.club_id).emit("club-message-received", data);
    socketService.onClubMessageSent(data);
  });

  // CODE AMANI ////
  /////////// approve quiz ///////////
  socket.on("quizz-approved", async (data) => {
    console.log("dataaaaaaaaa" + data);
    const connectedSockets = await io.fetchSockets();
    const conenctedFormatted = connectedSockets.map((x) => {
      return {
        id: x.user._id,
        lastname: x.user.lastname,
        socketId: x.id,
      };
    });
    console.log("formated conencted", conenctedFormatted);
    console.log("QUIZZ APP TRIGGERED", data.user_id);
    console.log("user id ", socket.user._id);
    const socketId = connectedSockets.find((x) => x.user._id == data.user_id);
    console.log("socketID" + socketId);
    io.to(socketId.id).emit("my-quizz-approved", data);
  });

  //////// delete  quiz ////////

  socket.on("quizz-deleted", async (data) => {
    console.log("dataaa" + data.quiz._id);

    const connectedSockets = await io.fetchSockets();
    const connectedFormatted = connectedSockets.map((x) => {
      return {
        id: x.user._id,
        lastname: x.user.lastname,
        socketId: x.id,
      };
    });
    //  console.log("formated connected", connectedFormatted);
    console.log("QUIZZ APP TRIGGERED", data.quiz.user_id);
    console.log("user id ", socket.user._id);
    const socketId = connectedSockets.find(
      (x) => x.user._id == data.quiz.user_id
    );
    console.log(" messageeeee" + { socketId });

    if (socketId) {
      io.to(socketId.id).emit("my-deleted-quizz", data);
      console.log("socket cote server" + data);
    }
  });
  ////////// delete event //////////
  socket.on("event-deleted", async (data) => {
    console.log("dataaa" + data.event._id);

    const connectedSockets = await io.fetchSockets();
    const connectedFormatted = connectedSockets.map((x) => {
      return {
        id: x.user._id,
        lastname: x.user.lastname,
        socketId: x.id,
      };
    });
    //  console.log("formated connected", connectedFormatted);
    console.log("event APP TRIGGERED", data.event.owner);
    console.log("user id ", socket.user._id);
    const socketId = connectedSockets.find(
      (x) => x.user._id == data.event.owner
    );
    console.log(" messageeeee" + { socketId });

    if (socketId) {
      io.to(socketId.id).emit("my-deleted-event", data);
      console.log("socket cote server" + data);
    }
  });

  ///////// delete post///////////
  socket.on("post-deleted", async (data) => {
    console.log("dataaaPOST" + data.owner_Id);

    const connectedSockets = await io.fetchSockets();
    const connectedFormatted = connectedSockets.map((x) => {
      return {
        id: x.user._id,
        lastname: x.user.lastname,
        socketId: x.id,
      };
    });
    //  console.log("formated connected", connectedFormatted);
    console.log("post APP TRIGGERED", data.owner_Id);
    console.log("user id ", socket.user._id);
    const socketId = connectedSockets.find((x) => x.user._id == data.owner_Id);

    if (socketId) {
      io.to(socketId.id).emit("my-deleted-post", data);
      console.log("socket cote server" + data);
    }
  });
  //////////

  /////// approve post ////////
  socket.on("post-approved", async (data) => {
    const connectedSockets = await io.fetchSockets();
    const conenctedFormatted = connectedSockets.map((x) => {
      return {
        id: x.user._id,
        lastname: x.user.lastname,
        socketId: x.id,
      };
    });
    console.log("formated conencted", conenctedFormatted);
    console.log("QUIZZ APP TRIGGERED", data.owner_Id);
    console.log("user id ", socket.user._id);
    const socketId = connectedSockets.find((x) => x.user._id == data.owner_Id);
    console.log("socketID" + socketId);
    io.to(socketId.id).emit("my-post-approved", data);
  });
  // END CODE AMANI ///
  //});

  setTimeout(async () => {
    const clubsIds = await socketService.getUserClubs(socket.user);
    socket.join(clubsIds);
  }, 8000);

  socket.on("private-message-sent", async (data) => {
    const sender = {
      _id: socket.user._id,
      lastname: socket.user.lastname,
      firstname: socket.user.firstname,
      photo: socket.user.photo,
    };
    const receiver = data.receiver;

    const result = await chatController.addMessage({
      message: data.message,
      sender,
      receiver,
    });
    if (result.acknowledged) {
      const connectedSockets = await io.fetchSockets();
      const receiverSocketId = connectedSockets.find(
        (x) => x.user._id == receiver._id
      );
      if (receiverSocketId) {
        io.to(receiverSocketId.id).emit("private-message-received", {
          message: data.message,
          sender,
        });
      }
    }
  });
});
