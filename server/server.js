var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var port = process.env.PORT || process.env.NODE_PORT || 3000;

var index = fs.readFileSync(__dirname + "/../client/client.html");

server.listen(port);
console.log("Listening on 127.0.0.1:" + port);

var onJoin = function(socket){
    socket.on('join', function(data){
      socket.emit('msg', {'msg':'joined'});
      console.log("sent msg packet");
    });
};

var onMsg = function(socket){

};

app.get('/', function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(index);
  res.end();
});

app.get('/client/client.js', function(req,res){
  res.writeHead(200, {"Content-Type": "application/javascript"});
  res.write(fs.readFileSync(__dirname+"/../client/client.js"));
  res.end();
});

/// Set up event listeners for the socket
io.sockets.on("connection", function(socket){
  onJoin(socket);
  onMsg(socket);
});

console.log("Server File Running");
