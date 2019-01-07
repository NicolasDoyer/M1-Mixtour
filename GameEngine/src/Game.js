import { Board } from './Board';
import { Piece } from './Piece';
import { Player } from './Player';

const SCORE_TO_WIN = 1;

export class Game {
    constructor() {
        this.board = new Board();
        this.turn = Piece.WHITE;
        this.players = {};
        this.winner = undefined;

        this.players[Piece.WHITE] = new Player('WHITE');
        this.players[Piece.RED] = new Player('RED'); 
    }

    nextTurn() {
        if (this.turn === Piece.WHITE) {
            this.turn = Piece.RED;
        } else {
            this.turn = Piece.WHITE;
        }
    }

    putPiece(player, endRow, endCol) {
        if (this.board.cells[endRow][endCol] !== '') {
            throw new Error('Place already taken');
        }
        if (player.backpieces <= 0) {
            throw new Error('Player has no pieces');
        }

        this.board.cells[endRow][endCol] = Piece[player.color];
        player.backpieces--;
    }

    movePieces(player, startRow, startCol, endRow, endCol, nbPieces) {
        const distance = this.board.cells[endRow][endCol].length;
        console.log(distance);

        if (this.board.cells[startRow][startCol] === '') {
            throw new Error('Start empty');
        }

        if (this.board.cells[endRow][endCol] === '') {
            throw new Error('End empty');
        }
        
        if (startRow < 0 || startCol < 0 || endRow < 0 || endCol < 0 || 
          startRow >= Board.SIZE || startCol >= Board.SIZE || endRow >= Board.SIZE || endCol >= Board.SIZE
        ) {
            throw new Error('Invalid coords');
        }

        if (
            (startRow === endRow && Math.abs(startCol - endCol) === distance) || // vertical
            (startCol === endCol && Math.abs(startRow - endRow) === distance) || // horizontal
            (Math.abs(startRow - endRow) === distance && Math.abs(startCol - endCol) === distance) // diagonal
        ) {
            const signCol = Math.sign(startCol - endCol);
            const signRow = Math.sign(startRow - endRow);
            for(let i = 1; i < distance; ++i) {
                console.log(signRow, signCol)
                if(this.board.cells[startRow + i * signRow][startCol + i * signCol] !== '') {
                    throw new Error('Unempty cells between start and end');
                }
            }
        } else {
            throw new Error('bad targetted distance');
        }

        if (this.board.cells[startRow][startCol].length < nbPieces || nbPieces <= 0) {
            throw new Error('Invalid move');
        }

        // On est bon ptdr
        this.board.cells[endRow][endCol] += this.board.cells[startRow][startCol].slice(-nbPieces);
        this.board.cells[startRow][startCol] = this.board.cells[startRow][startCol].slice(this.board.cells[startRow][startCol].length - nbPieces);

        // Check win
        if (this.board.cells[endRow][endCol].length >= 5) {
            const stack = this.board.cells[endRow][endCol];
            this.board.cells[endRow][endCol] = '';
            for(const piece of stack) {
                this.players[piece].backpieces++;
            }
            player.score++;
            if (player.score >= SCORE_TO_WIN) {
                this.winner = player;
            }
        }    
    }

    play(player, startRow, startCol, endRow, endCol, nbPieces) {
        if (startRow === -1 && startCol === -1) { // put pieces
            this.putPiece(player, startRow, startCol);
        } else { // move pieces
            this.movePieces(player, startRow, startCol, endRow, endCol, nbPieces);
        }
        this.nextTurn();
    }

    finished() {
        return !!this.winner;
    }
}