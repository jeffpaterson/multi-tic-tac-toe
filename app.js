const express = require("express");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

const morgan = require("morgan");
const locus = require("locus");
var userIds = []

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
  console.log("connection made");
  if (userIds.length > 0) {
    socket.emit('moveType', 'O');
  } else {
    socket.emit('moveType', 'X';)
  }
  userIds << socket['client'].id;
  socket.on("move", function(move){
    console.log("Move: " + msg);
    socket.broadcast.emit(move);
  });
});
http.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
