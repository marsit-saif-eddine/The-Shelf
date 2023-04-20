const app=require('./app.js');
const http=require('http');
const server=http.createServer(app);
const socketService = require('./services/socket/socket')

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	console.log("connection",socket.id)
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


server.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
});

// exports.io = require("socket.io")(server, {
//     cors: {
//       origin: "*",
//     }
//   });



// WAJIH'S CODE

io.use((socket, next) => {
	//     jtoken.verify(socket.handshake.auth.token, process.env.TOKEN_SECRET, (err, decoded) => {
	//       if (err) {
	//         return next(new Error("UNAUTHORIZED"));
	//       }
	//       socket.user_id = decoded.user_id;
	//       next();
	//   });
		if (!socket.handshake.auth.user_id) {
			return next(new Error('unauthorized'));
		} 
		socket.user_id = socket.handshake.auth.user_id;
	
		next();
	
	}).on('connection', async (socket) => {

	socket.on("club-message-sent",(data) => {
	  data.creation_date = new Date();
	  io.to(data.club_id).emit('club-message-received', data);
	  socketService.onClubMessageSent(data);
	});


	setTimeout(async () => {
		const clubsIds = await socketService.getUsersClubs(socket.user_id);
		console.log(clubsIds);
		socket.join('642e44e41dc5373ec819dafd');
	}, 8000);
  

  
  });

