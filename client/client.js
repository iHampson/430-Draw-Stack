var socket;

/// Connects to the socketIo lib
function setupSocket(){
  socket.emit('join'); // Might not need this if i don't need rooms

  socket.on('msg', function(data){
    console.log(data);
  });

}

function init(){
  socket = io.connect();
  setupSocket();
}

init();
