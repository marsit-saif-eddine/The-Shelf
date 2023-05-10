const app = require("./app.js");
const http = require("http");
const server = http.createServer(app);
const socketService = require("./services/socket/socket");
const jwt = require("jsonwebtoken");
const chatController = require('./controllers/chat-management/chat-controller.js');


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
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})
//end video confrence

// exports.io = require("socket.io")(server, {
//     cors: {
//       origin: "*",
//     }
//   });

// WAJIH'S CODE


io.use((socket, next) => {
  try {
  let token = socket.handshake.auth.token;
  if (token) {
    token = token.replace(`"`, "");
    token = token.replace(`"`, "");
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        throw new Error("UNAUTHORIZED");
      }
      socket.user = decoded;
      next();
    }
  );
  } catch(ex) {}
}).on("connect", (socket) => {
  socket.on("club-message-sent", (data) => {
    data.creation_date = new Date();
    io.to(data.club_id).emit("club-message-received", data);
    socketService.onClubMessageSent(data);
  });

  setTimeout(async () => {
    const clubsIds = await socketService.getUserClubs(socket.user);
    socket.join(clubsIds);
  }, 8000);


  socket.on("private-message-sent", async (data) => {
    const sender = {_id: socket.user._id, lastname: socket.user.lastname, firstname: socket.user.firstname, photo: socket.user.photo};
    const receiver = data.receiver;

    const result = await chatController.addMessage({message: data.message, sender, receiver});
    if (result.acknowledged) {
      const connectedSockets = await io.fetchSockets();
      const receiverSocketId = connectedSockets.find(x => x.user._id == receiver._id);
      if (receiverSocketId) {
        io.to(receiverSocketId.id).emit('private-message-received', ({message: data.message, sender}));
      }
    }



  });

});

