import { MINED_TILE as M } from './constants/tiles.js';

export default class Board {
  constructor() {
    this.state = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
  }

  /**
  * mine(x,y): Places a mine at the position (x, y). Ignores duplicates and out of bounds.
  **/
  mine(x, y) {
    if (!this.inBounds(x, y) || this.isMine(x,y)) {
      return;
    }

    this.state[x][y] = M;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (this.inBounds(x+i, y+j) && !this.isMine(x+i, y+j)) {
          this.state[x+i][y+j] += 1;
        }
      }
    }
  }

  inBounds(x, y) {
    return x >= 0 && y >= 0 && x < 5 && y < 5;
  }

  isMine(x, y) {
    return this.state[x][y] == M;
  }

  isZero(x, y) {
    return this.inBounds(x, y) && this.state[x][y] == 0;
  }
}
