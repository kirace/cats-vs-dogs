var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path');

var score = {catScore: 0, dogScore: 0};
var dict = new Map();
var currentTop = [];

function getTopGIFS(){ // creates array of map items and sorts them by votes, returns top 3 GIFs
  sorted = [];
  for (var [key, value] of dict) { //transfer entries to array
    sorted.push([key, value]);
  }
  sorted.sort(function(first, second) { //sort by value
    return second[1] - first[1];
  });
  return sorted; //sorted.splice(0,3);
}

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){

  socket.on('dogVote', function(key){ // increases Dog score by 1, updates Map(GIF-id, # of votes)
    score.dogScore++;
    let value = (dict.get(key) !== undefined) ? dict.get(key) + 1 : 1;
    dict.set(key, value);
    io.emit('updateScore', { //send updated score to clients
      catScore: score.catScore,
      dogScore: score.dogScore
    });
    let topGIFS = getTopGIFS();
    io.emit('updateTop', topGIFS);  //send updated top GIFs to clients
  });

  socket.on('catVote', function(key){  // increases Dog score by 1, updates Map(GIF-id, # of votes)
    score.catScore++;
    let value = (dict.get(key) !== undefined) ? dict.get(key) + 1 : 1;
    dict.set(key, value);
    io.emit('updateScore', {  //send updated score to clients
      catScore: score.catScore,
      dogScore: score.dogScore
    });
    io.emit('updateTop', getTopGIFS()); //send updated top GIFs to clients
  });

  socket.on('getScore', function(){
    io.emit('updateScore', { //send updated score to clients
      catScore: score.catScore,
      dogScore: score.dogScore
    });
    io.emit('updateTop', getTopGIFS()); //send updasted top GIFs to clients
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
