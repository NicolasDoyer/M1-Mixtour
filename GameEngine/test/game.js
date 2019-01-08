const assert = require('assert');
import { Game } from '../src/Game';
import { Piece } from '../src/Piece';

describe('Game engine', () => {

    // Game test
    it('should create', () => {
        const game = new Game();
        assert(game);
    })
    it('should have an empty board', () => {
        const game = new Game();
        assert(game.board);
        assert(game.board.cells.every(row => row.every(cell => cell === '')));
    });

    it('should have 2 players red and white', () => {
        const game = new Game();
        const players = Object.values(game.players);
        assert(players.find(p => p.color === 'RED'));
        assert(players.find(p => p.color === 'WHITE'));
    })
    it('white player should start', () => {
        const game = new Game();
        assert(game.turn === Piece.WHITE);
    })
    it('put pieces', () => {
        const game = new Game();
        game.board.cells[0][0] = '';
        game.play(game.players['W'], {type: 'put', coords: [0, 0]});
        assert(game.board.cells[0][0] === 'W');
    })
    it('red player should continue', () => {
        const game = new Game();
        game.play(game.players['W'], {type: 'put', coords: [0, 0]});
        assert(game.turn === Piece.RED);
    })
    it('check put place already taken', () => {
        const game = new Game();
        game.board.cells[0][0] = 'R'
        assert.throws(() => {
            game.play(game.players['W'], {type: 'put', coords: [0, 0]})
        }, {name: 'Error', message: 'Place already taken'});
    })
    it('check pieces left', () => {
        const game = new Game();
        game.players['W'].backpieces = 0;
        assert.throws(() => {
            game.play(game.players['W'], {type: 'put', coords: [1,1]})
        }, { name: 'Error', message: 'Player has no pieces' });
    })

//add move start or end empty OR outOfTheBoard

    // Move 's mechaniks
    it('check correct nb of pieces', () => {
        const game = new Game();
        game.board.cells[0][0] = 'RR';
        game.board.cells[0][2] = 'WW';
        assert.throws(() => {
            game.play(game.players['W'], {type: 'move', from: [0,0], to: [0,2], nbPieces: 3})
        }, { name: 'Error', message: 'Wrong number of pieces' });
    })
    it('must fit target height and distance', () => {
        const game = new Game();
        game.board.cells[1][1] = 'WWR';
        game.board.cells[4][4] = 'WR';
        assert.throws(() => {
            game.play(game.players['W'], {type: 'move', from: [1,1], to: [4,4], nbPieces: 3})
        }, { name: 'Error', message: 'Bad targetted distance' });

        game.board.cells[3][0] = 'R';
        game.board.cells[3][1] = '';
        game.board.cells[3][2] = 'W';
        assert.throws(() => {
            game.play(game.players['W'], {type: 'move', from: [3,0], to: [3,2], nbPieces: 1})
        }, { name: 'Error', message: 'Bad targetted distance' });

        game.board.cells[0][1] = 'R';
        game.board.cells[0][2] = 'WRWR';
        assert.throws(() => {
            game.play(game.players['W'], {type: 'move', from: [0,1], to: [0,2], nbPieces: 1})
        }, { name: 'Error', message: 'Bad targetted distance' });

    })
    it('can split', () => {
        const game = new Game();
        game.board.cells[1][3] = 'RW';
        game.board.cells[1][2] = '';
        game.board.cells[1][1] = 'WRWR';
        assert.doesNotThrow(() => {
            game.play(game.players['W'], {type: 'move', from: [1,1], to: [1,3], nbPieces: 2})
        }, { name: 'Error', message: 'Bad targetted distance' });
    })
    it('can goes (splited T4 on T1)', () => {
        const game = new Game();
        game.board.cells[0][1] = 'R';
        game.board.cells[0][2] = 'WRWR';;
        assert.doesNotThrow(() => {
            game.play(game.players['W'], {type: 'move', from: [0,2], to: [0,1], nbPieces: 4})
        }, { name: 'Error', message: 'Bad targetted distance' });
    })
    it('can goes (T3 on T2)', () => {
        const game = new Game();
        game.board.cells[2][1] = 'WRW';
        game.board.cells[2][2] = '';
        game.board.cells[2][3] = 'WR';
        assert.doesNotThrow(() => {
            game.play(game.players['W'], {type: 'move', from: [2,1], to: [2,3], nbPieces: 3})
        }, { name: 'Error', message: 'Bad targetted distance' });
    })
    it('must not have piece between', () => {
        const game = new Game();
        game.board.cells[1][1] = 'WWR';
        game.board.cells[3][3] = 'R';
        game.board.cells[4][4] = 'WRW';
        assert.throws(() => {
            game.play(game.players['W'], {type: 'move', from: [1,1], to: [4,4], nbPieces: 3})
        }, { name: 'Error', message: 'Unempty cells between start and end' });

        // In reverse diag'
        game.board.cells[0][4] = 'RWRW';
        game.board.cells[1][3] = '';
        game.board.cells[2][2] = '';
        game.board.cells[3][1] = '';
        game.board.cells[4][0] = 'WRWR';
        assert.doesNotThrow(() => {
            game.play(game.players['W'], {type: 'move', from: [4,0], to: [0,4], nbPieces: 4})
        }, { name: 'Error', message: 'Unempty cells between start and end' });
        game.board.cells[0][4] = 'RWRW';
        game.board.cells[1][3] = 'RR';
        game.board.cells[2][2] = '';
        game.board.cells[3][1] = '';
        game.board.cells[4][0] = 'WRWR';
        assert.throws(() => {
            game.play(game.players['W'], {type: 'move', from: [4,0], to: [0,4], nbPieces: 4})
        }, { name: 'Error', message: 'Unempty cells between start and end' });
    })

    it('checks W win', () => {
        const game = new Game();
        game.board.cells[0][0] = 'RWRW';
        game.board.cells[0][4] = 'RWRW';
        game.play(game.players['W'], {type: 'move', from: [0,0], to: [0,4], nbPieces: 4});
        assert(game.players['W'].backpieces === 20);
        assert(game.players['R'].backpieces === 20);
        assert(game.players['W'].score === 1);
        assert(game.winner === game.players['W']);
    })
    //Pass
    it('checks W pass', () => {
        const game = new Game();
        assert(game.players['W'].pass === true);
    })
    //draw (2 forms)
    it('checks draw by 2 passes', () => {
        const game = new Game();
        game.players['W'].winner = false;
        game.players['R'].winner = false;
        game.players['W'].score = 1;
        game.players['R'].score = 1;
        game.players['W'].pass = true;
        game.players['R'].pass = true;
        assert(game.draw === true);

        /* Et si les deux joueurs sont d'accord : */
        game.draw = false; // à modifier à l'implémentation de la fonctionnalité
        assert(game.draw === true);
    })
})