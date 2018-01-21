const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
//const SetInterval = require('set-interval');

require('es6');

var domtoimage = require('dom-to-image');
var bodyParser = require('body-parser');

/////////////Tell Socket.io to accept connections
//var allClients = [];
var players = {};
var afk = {};
var numPlayers = 0;
io.on('connection', function(socket){
  //A new user has connected!
  //allClients.push(socket);
  socket.on("id", function(id, char){
    numPlayers++
    if(numPlayers == 1){
      players[`${id}`] = [char, '120px', '0px'];
    }
    else if(numPlayers == 2){
      players[`${id}`] = [char, '73px', '0px'];
    }
    else if(numPlayers == 3){
      players[`${id}`] = [char, '43px', '10px'];
    }
    else if(numPlayers == 4){
      players[`${id}`] = [char, '85px', '310px'];
    }
    else if(numPlayers == 5){
      players[`${id}`] = [char, '200px', '200px'];
    }
    else if(numPlayers == 6){
      players[`${id}`] = [char, '345px', '7px'];
    }
    else if(numPlayers == 7){
      players[`${id}`] = [char, '55px', '260px'];
    }
    else if(numPlayers == 8){
      players[`${id}`] = [char, '195px', '390px'];
    }
    else if(numPlayers == 9){
      players[`${id}`] = [char, '305px', '310px'];
    }
    else if(numPlayers == 10){
      players[`${id}`] = [char, '259px', '10px'];
    }
    afk[`${id}`] = [0, 0]; 
    //socket.emit("players", players);
  });
  socket.on("timeInterval", function(){
    socket.emit("players", players);
  });
});
/*
SetInterval.start(function(){
  for(var element in afk){
    afk[element][0] += 1;
    afk[element][1] += 1;
    if(afk[element][0] == 16) {
      //afk
    }
    if(afk[element][1] == 120) {
      //log user out
    }
  };
}, 5000);*/



///////////////Start the server and post redirect
app.post('/', (req, res) => {
  res.redirect('/');
});
app.get('/', (req, res) => {
	res.sendFile('/human2.html', { root: __dirname });
});
app.get('/clothes', (req, res) => {
	res.sendFile('/humanClothes.html', { root: __dirname });
});
//just use a different route
app.get("/world", function(req, res, next){
	res.sendFile('/world.html', { root: __dirname });
});

app.use(express.static((__dirname + '/static')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.post("/clothes", function(req, res){
	res.sendFile("/"+req.body.clothing, { root: __dirname });
});
app.post("/world", function(req, res){
	res.sendFile("/"+req.body.world, { root: __dirname });
});

//app listen to port
var port = process.env.PORT || 8081;
//If you're running locally, you can now open localhost:8080 in a web browser and see it running!
http.listen(port, function(){
  console.log('listening on *:8081');
});