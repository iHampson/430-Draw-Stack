var socket;
var canvas;
var ctx;
var draws = {};
//Imagine an object inside of draws to look like {x: 10, y: 10, width: 10, height: 10}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var keys = Object.keys(draws);

  for(var i = 0; i < keys.length; i++){
    if(i !== 0 || i !== 1){
      ctx.fillStyle = '#15FCFC';
    }else{ ctx.fillStyle = '#3AAD1D';}
    
    var drawCall = draws[ keys[i] ];
    ctx.fillRect(drawCall.x, drawCall.y, drawCall.width, drawCall.height);
  }
}

function setCalls(mod){

  var time = new Date().getTime();
  draws[time] = {x: 100 + mod, y: 100 + mod, width: 100, height: 100};
  time = new Date().getTime();
  var coords = {x: 0 + mod, y:0, width:100, height:100};

  socket.emit('draw', {time: time, coords: coords});
}

function handleMessage(data){
  draws[data.time] = data.coords;
  draw();
}

/// Connects to the socketIo lib
function setupSocket(){
  socket.emit('join');

  socket.on('msg', function(data){
    console.log(data.msg);
  });

  socket.on('drawThis', handleMessage);
}

function init(){
  socket = io.connect();
  canvas = document.querySelector('#client');
  ctx = canvas.getContext('2d');
  setupSocket();
  setCalls(0);
  setCalls(200);
  draw();
}

window.onload = init;
