const assert = require('assert');

import { Player } from '../src/Player';

describe('Player class', () => {
    const player = new Player('W');
    it('should create a player', () => {
        assert(player);
    })
    it('should set the color', () => {
        assert(player.color == 'W');
    })
    it('should set pieces to 20', () => {
        assert(player.backpieces == 20);
    })
})