const assert = require('assert');
import { Piece } from '../src/Piece';

describe('Piece', () => {
    it('should be defined', () => {
        assert(Piece.RED && Piece.WHITE);
    });
})