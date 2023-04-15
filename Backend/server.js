const app=require('./app.js');
const http=require('http');
const server=http.createServer(app);
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

