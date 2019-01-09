var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const axios = require('axios');
import { Game } from './Game';
import { Piece } from './Piece';

const queue = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('goToQueue', goToQueue);
});

function goToQueue({token, tournamentId}) {
  axios.get(`http://localhost:8000/api/verifytoken?token=${token}`)
    .then(response => {
      if(response.status === 200) {
        this.token = token;
        this.tournamentId = tournamentId;
        if(!queue[tournamentId]) {
          queue[tournamentId] = [];
        }
        this.userId = response.data.id_user;
        queue[tournamentId].push(this);
        this.emit('queueValidation');
        this.removeAllListeners('goToQueue');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function checkQueue() {
  for(const tournament in queue) {
    const tournamentQueue = queue[tournament];
    while(tournamentQueue.length >= 2) {
      const sockets = tournamentQueue.splice(-2);
      const game = new Game();
      sockets[0].player = game.players[Piece.WHITE];
      sockets[1].player = game.players[Piece.RED];
      const emitBoard = () => {
        sockets.forEach((socket) => {
          socket.emit('board', {
            board: game.board.cells,
            finished: game.finished,
            winner: game.winner ? Piece[game.winner.color] : null,
            turn: game.turn,
            player: Piece[socket.player.color]
          });
        });
      }
      emitBoard();
      sockets.forEach(socket => {
        socket.on('move', (move) => {
          if(game.finished) return;
          try {
            game.play(socket.player, move);
            emitBoard();
            if (game.finished) {
              sockets.forEach((socket) => {
                socket.emit('board', {
                  board: game.board.cells,
                  finished: game.finished,
                  winner: game.winner ? Piece[game.winner.color] : null,
                  turn: game.turn,
                  player: Piece[socket.player.color]
                });
                // goToQueue.apply(socket, [socket.token]);
              });
              const winner = sockets.find(s => s.player === game.winner); 
              console.log(sockets.find(s => s.player === game.winner).userId);
              console.log({
                "date": new Date().toISOString(),
                "joueur1": sockets[0].userId,
                "joueur2": sockets[1].userId,
                "tournament": socket.tournamentId,
                "vainqueur": winner ? winner.userId : null
              });
              axios.post('http://localhost:8000/api/duels', {
                "date": new Date().toISOString(),
                "joueur1": sockets[0].userId,
                "joueur2": sockets[1].userId,
                "tournament": socket.tournamentId,
                "vainqueur": winner ? winner.userId : null
              });
            }
          } catch(error) {
            socket.emit('board', {
              board: game.board.cells,
              finished: game.finished,
              winner: game.winner,
              turn: game.turn,
              player: Piece[socket.player.color]
            });
            socket.emit('fuck', {msg: error.toString()})
          }
        });
      });
    }
  }
}

setInterval(checkQueue, 1000);

server.listen(3000, function(){
  console.log('listening on *:3000');
});