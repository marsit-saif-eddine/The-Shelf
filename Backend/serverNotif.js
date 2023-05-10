//const Quiz = require("../../models/quiz.js");
const http = require("http");
//const { getSocket } = require("../../server.js");
const server = http.createServer();

const socketio = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    //methods: ["GET", "POST"],
  },
});
let  currentSocketNotif;

socketio.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

server.listen(8000, () => {
    console.log(`server running on port 8000`);
  });
  //  exports.getSocketNotif = () => {console.log(socket); return socket}