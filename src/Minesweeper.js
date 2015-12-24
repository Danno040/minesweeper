import { BLANK_TILE as B, EXPLODED_MINE_TILE } from './constants/tiles';

export default class Minesweeper {
    constructor(board) {
      this.bombs = 5;

      this.internalBoard = board;
      this.initializeValues();
    }

    reset() {
      this.initializeValues();
    }

    initializeValues() {
      this.clearTileCount = 20;

      this.visibleBoard = [
        [B, B, B, B, B],
        [B, B, B, B, B],
        [B, B, B, B, B],
        [B, B, B, B, B],
        [B, B, B, B, B]
      ];

      this.started = false;
      this.startedAt = -1;
      this.gameOverCallback = null;
    }

    start(gameOverFxn) {
      if (this.started) {
        return;
      }

      this.started = true;
      this.gameOverCallback = gameOverFxn;
      this.startedAt = Date.now();
    }

    bombCount() {
      return this.bombs;
    }

    board() {
      return this.visibleBoard;
    }

    click(x, y) {
      if (!this.internalBoard.inBounds(x, y) || this.visibleBoard[x][y] != '?') {
        return true;
      }

      if (this.internalBoard.isMine(x,y)) {
        this.revealBoard();

        // Show the killer mine
        this.visibleBoard[x][y] = EXPLODED_MINE_TILE;

        this.gameOverCallback({
          victory: false,
          elapsedTime: Date.now() - this.startedAt
        });

        return false;
      }

      // Reveal the clicked tile
      this.visibleBoard[x][y] = this.internalBoard.state[x][y];
      this.clearTileCount--;

      if (this.clearTileCount == 0) {
        this.revealBoard();

        this.gameOverCallback({
          victory: true,
          elapsedTime: Date.now() - this.startedAt
        });

        return false;
      }

      // If tile was a zero, reveal all connected zero tiles
      if (this.visibleBoard[x][y] == 0) {
        this.revealZeros(x, y);
      }

      return false;
    }

    // Reveals all the zero tiles connected to the given position (x, y)
    revealZeros(x, y) {
      const tilesToCheck = [
        [x-1, y-1], // Upper left
        [x, y-1], // Upper center
        [x+1, y-1], // Upper Right
        [x-1, y], // Left
        [x+1, y], // Right
        [x-1, y+1], // Bottom left
        [x, y+1], // Bottom center
        [x+1, y+1] // Bottom Right
      ];

      tilesToCheck.map((position) => {
        this.click(position[0], position[1]);
      });
    }

    // Reveals the entire board
    revealBoard() {
      this.internalBoard.state.map((row, i) => {
        row.map((tile, j) => {
          this.visibleBoard[i][j] = tile;
        });
      });
    }
}
