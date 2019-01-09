import { Board } from './Board';
import { Piece } from './Piece';
import { Player } from './Player';

export class Game {

    constructor(max_score = 1, max_tour_height = 5) {
        this.max_score = 1;
        this.max_tour_height = 5;

        this.board = new Board();
        this.previousBoard = new Board();
        this.turn = Piece.WHITE;
        this.players = {};
        this.winner = null;
        this.players[Piece.WHITE] = new Player('WHITE');
        this.players[Piece.RED] = new Player('RED'); 
        this.finished = false;
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

    savePreviousBoard() {
        for (var i = 0; i < this.board.BOARD_SIZE; i++) {
            for (var j = 0; j < this.board.BOARD_SIZE; j++) {
                for (var k = 0; k < this.board.cells[i][j].length; k++) {
                    this.previousBoard[i][j][k] = this.board.cells[i][j][k];
                }
            }
        }
    }

    checkSamePreviousBoard() {
        for (var i = 0; i < this.board.BOARD_SIZE; i++) {
            for (var j = 0; j < this.board.BOARD_SIZE; j++) {
                if (this.board.cells[i][j] !== this.previousBoard[i][j]) {
                    return true;
                }
            }
        }
        return false
    }

    movePieces(player, startRow, startCol, endRow, endCol, nbPieces) {
        const distance = this.board.cells[endRow][endCol].length;

        if (this.board.cells[startRow][startCol] === '') {
            throw new Error('Start empty');
        }
        if (this.board.cells[endRow][endCol] === '') {
            throw new Error('End empty');
        }

        if (
            (startRow === endRow && Math.abs(startCol - endCol) === distance) || // vertical
            (startCol === endCol && Math.abs(startRow - endRow) === distance) || // horizontal
            (Math.abs(startRow - endRow) === distance && Math.abs(startCol - endCol) === distance) // diagonal
        ) {
            const signCol = Math.sign(endCol - startCol);
            const signRow = Math.sign(endRow - startRow);
            for(let i = 1; i < distance; ++i) {
                if(this.board.cells[startRow + i * signRow][startCol + i * signCol] !== '') {
                    throw new Error('Unempty cells between start and end');
                }
            }
        } else {
            throw new Error('Bad targetted distance');
        }

        if (this.board.cells[startRow][startCol].length < nbPieces || nbPieces <= 0) {
            throw new Error('Wrong number of pieces');
        }

        // On est apparamment bon
        this.board.cells[endRow][endCol] += this.board.cells[startRow][startCol].slice(-nbPieces);
        this.board.cells[startRow][startCol] = this.board.cells[startRow][startCol].slice(0, this.board.cells[startRow][startCol].length - nbPieces);

        if (this.checkSamePreviousBoard() === false) {
        // Ah bah non
            this.board.cells[startRow][startCol] += this.board.cells[endRow][endCol].slice(-nbPieces);
            this.board.cells[endRow][endCol] = this.board.cells[endRow][endCol].slice(0, this.board.cells[endRow][endCol].length - nbPieces);

            for (var i = 0; i < this.board.BOARD_SIZE; i++) {
                for (var j = 0; j < this.board.BOARD_SIZE; j++) {
                    console.log(this.previousBoard[i][j] +'\n'+ this.board.cells[i][j]);
                }
            }

            throw new Error('Cannot return to previous board');
        }

        this.savePreviousBoard();

        // Check win
        if (this.board.cells[endRow][endCol].length >= this.max_tour_height) {
            const stack = this.board.cells[endRow][endCol];
            this.board.cells[endRow][endCol] = '';
            for(const piece of stack) {
                this.players[piece].backpieces++;
            }
            player.score++;
            if (player.score >= this.max_score) {
                this.winner = player;
                this.finished = true;
            }
        }    
    }

    isValidCoords(coords) {
        return coords && coords.length === 2 && coords.every(c => Number.isInteger(c) && c >= 0 && c < Board.BOARD_SIZE);
    }

    checkParam(move) {
        if(!move) return false;
        if(!(move.type === "move" || move.type === "put" || move.type === 'pass')) return false;

        if(move.type === "move") {
            if(!this.isValidCoords(move.from) || !this.isValidCoords(move.to)) return false;
            if(!move.nbPieces || !Number.isInteger(move.nbPieces) || move.nbPieces <= 0) return false; 
        }
        else if(move.type === "put") {
            if(!this.isValidCoords(move.coords)) return false;
        }
        return true;
    }

    /** 
     * {
     *  type: "move" | "put",
     *  // put
     *  coords: [x, y],
     *  // move
     *  from: [x, y],
     *  to: [x, y],
     *  nbPieces: int
     * }
     */
    play(player, move) {
        if(!this.checkParam(move)) {
            throw new Error('Invalid parameters');
        }
        if (Piece[player.color] !== this.turn) {
            throw new Error('It is not your turn !');
        }

        if(move.type === 'put') {
            const [startRow, startCol] = move.coords;
            this.putPiece(player, startRow, startCol);
            player.pass = false;
        } else if (move.type === 'pass') {
            player.pass = true;
            if (this.players['R'].pass === true && this.players['R'].pass === true) {
                this.draw = true;
                this.finished == true;
            }
        } else {
            const [startRow, startCol] = move.from;
            const [endRow, endCol] = move.to;
            this.movePieces(player, startRow, startCol, endRow, endCol, move.nbPieces);
            player.pass = false;
        }
        this.nextTurn();
    }
}