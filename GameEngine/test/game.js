const assert = require('assert');
import { Game } from '../src/Game';
import { Piece } from '../src/Piece';

describe('Game engine', () => {
    const game = new Game();
    it('should create', () => {
        assert(game);
    })
    it('should have an empty board', () => {
        assert(game.board);
        assert(game.board.cells.every(row => row.every(cell => cell === '')));
    });
    it('white player should start', () => {
        assert(game.turn === Piece.WHITE);
    })
    it('should have 2 players red and white', () => {
        const players = Object.values(game.players);
        assert(players.find(p => p.color === 'RED'));
        assert(players.find(p => p.color === 'WHITE'));
    })

    // Move 's mechaniks
    it('check correct nb of pieces', () => {
        game.board.cells[0][0] = 'RR';
        game.board.cells[0][2] = 'WW';
        assert.throws(function() {game.play(game.players['W'], 0, 0, 0, 2, 3)}, Error, "too much pieces selected", "")
    })
    it('check pieces left', () => {
        game.players['W'].backpieces = 0;
        game.board.cells[0][4] = '';
        assert.throws(function() {game.play(game.players['W'], -1, -1, 0, 4, 4)}, Error, "player has no pieces", "")
    })
    it('check place already taken', () => {
        assert.throws(function() {game.play(game.players['W'], -1, -1, 0, 4, 4)}, Error, "place already taken", "")
    })
    it('must fit target height and distance', () => {
        game.board.cells[1][1] = 'WWR';
        game.board.cells[4][4] = 'WR';
        assert.throws(function() {game.play(game.players['W'], 1, 1, 4, 4, 3)}, Error, "bad targetted distance", "")
    })
    it('must fit target height and distance', () => {
        game.board.cells[3][0] = 'R';
        game.board.cells[3][2] = 'W';
        assert.throws(function() {game.play(game.players['W'], 3, 0, 3, 2, 1)}, Error, "bad targetted distance", "")
    })
    it('must not have piece between', () => {
        game.board.cells[1][1] = 'WWR';
        game.board.cells[3][3] = 'R';
        game.board.cells[4][4] = 'WRW';
        assert.throws(function() {game.play(game.players['W'], 1, 1, 4, 4, 3)}, Error, "Unempty cells between start and end", "")
    })
    it('cannot split', () => {
        game.board.cells[0][1] = 'R';
        game.board.cells[0][2] = 'WRWR';
        assert.throws(function() {game.play(game.players['W'], 0, 1, 0, 3, -1)}, Error, "cannot split", "")
    })
    it('can goes (splited T4 on T1)', () => {
        game.board.cells[0][1] = 'R';
        game.board.cells[0][2] = 'WRWR';
        assert.doesNotThrow(function() {game.play(game.players['W'], 0, 2, 0, 1, 3)}, Error, "bad targetted distance", "")
        game.board.cells[0][1] = 'R';
        game.board.cells[0][2] = 'WRWR';
        assert.doesNotThrow(function() {game.play(game.players['W'], 0, 2, 0, 1, 3)}, Error, "cannot split", "")
    })
    it('can goes (T3 on T2)', () => {
        game.board.cells[2][1] = 'WRW';
        game.board.cells[2][2] = '';
        game.board.cells[2][3] = 'WR';
        assert.doesNotThrow(function() {game.play(game.players['W'], 2, 1, 2, 3, 3)}, Error, "bad targetted distance", "")
        game.board.cells[2][1] = 'WRW';
        game.board.cells[2][2] = '';
        game.board.cells[2][3] = 'WR';
        assert.doesNotThrow(function() {game.play(game.players['W'], 2, 1, 2, 3, 3)}, Error, "Unempty cells between start and end", "")
    })

})