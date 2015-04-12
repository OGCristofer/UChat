var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var lib = require("./lib");

// Chat
app.get("/", function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFileSync(__dirname + "/pages/chat.html", function(err, data){
    if (err) throw err;
    res.send(data);
  });
});

app.get(express.static(__dirname + "/static"));

io.on("connection", function(socket){
  lib.chat(socket);
});

http.listen(80, function(){
  console.log(" - Chat online.");
});
