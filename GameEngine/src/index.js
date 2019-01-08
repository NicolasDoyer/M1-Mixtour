var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import { Game } from './Game';
import { Piece } from './Piece';

const queue = [];

const game = new Game();
const test = {
  board: game.board.cells,
  finished: game.finished,
  winner: game.winner,
  turn: game.turn,
  player: 'W',
}

console.log(JSON.stringify(test))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('goToQueue', goToQueue);
});

function goToQueue() {
  queue.push(this);
  socket.emit('queueValidation');
  socket.off('goToQueue');
}

function checkQueue() {
  while(queue.length > 2) {
    const sockets = queue.splice(-2);
    const game = new Game();
    sockets[0].player = game.players[Piece.WHITE];
    sockets[1].player = game.players[Piece.RED];
    const emitBoard = () => {
      sockets.forEach((socket) => {
        socket.emit('board', {
          board: game.board.cells,
          finished: game.finished,
          winner: game.winner,
          turn: game.turn,
          player: socket.player.color
        });
      });
    }
    emitBoard();
    sockets.forEach(socket => {
      socket.on('move', (move) => {
        try {
          game.play(socket.player, move);
          emitBoard();
          if (game.finished()) {
            sockets.forEach((socket) => {
              socket.off('move');
              goToQueue.apply(socket);
            });
          }
        } catch(error) {
          socket.emit('error', {msg: error.toString()})
        }
      });
    });
  }
}

setInterval(checkQueue, 1000);

http.listen(3000, function(){
  console.log('listening on *:3000');
});