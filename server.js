var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var lib = require("./lib");

// Static
app.use("/static", express.static(__dirname + "/lib/static"));

// Chat
app.get("/", function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile(__dirname + "/pages/chat.html", function(err, data){
    if (err) throw err;
    res.end(data);
  });
});

io.on("connection", function(socket){
  lib.chat(socket);
});

http.listen(80, function(){
  console.log(" - Chat online.");
});
