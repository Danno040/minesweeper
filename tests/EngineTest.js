import Minesweeper from '../src/Minesweeper';
import testBoard from './fixures/testBoard';
import { BLANK_TILE as B } from '../src/constants/tiles.js';
import expects from 'unexpected';
import sinon from 'sinon';

describe('Minesweeper Engine', () => {
  let game;
  let gameOverStub = () => {};

  beforeEach(() => {
    game = new Minesweeper(testBoard);
  });

  it('reports how many bombs are on the map', () => {
    expects(game.bombCount(), 'to be', 5);
  });

  it('reports the visible state of the board', () => {
    const cleanBoard = [
      [B, B, B, B, B],
      [B, B, B, B, B],
      [B, B, B, B, B],
      [B, B, B, B, B],
      [B, B, B, B, B]
    ];

    expects(game.board(), 'to equal', cleanBoard);
  });

  it('can start a new game', () => {
    let gameOverFxn = () => {};
    game.start(gameOverFxn);
  });

  describe('gameplay', () => {
    describe('reveal behavior', () => {
      beforeEach(() => {
        game.start(gameOverStub);
      });

      it('reveals a tile when clicked on', () => {
        const oneRevealedBoard = [
          [3, B, B, B, B],
          [B, B, B, B, B],
          [B, B, B, B, B],
          [B, B, B, B, B],
          [B, B, B, B, B]
        ];

        // Click a title
        game.click(0, 0);

        expects(game.board(), 'to equal', oneRevealedBoard);
      });

      it('cascades when a zero tile is clicked', () => {
        const zeroRevealedBoard = [
          [B, B, B, B, B],
          [B, B, B, B, B],
          [2, 3, 3, B, B],
          [0, 0, 1, 1, 1],
          [0, 0, 0, 0, 0]
        ];

        // Click a title
        game.click(4, 0);

        expects(game.board(), 'to equal', zeroRevealedBoard);
      });
    });

    describe('game over behavior', () => {
      let gameOverSpy;
      beforeEach(() => {
        gameOverSpy = sinon.spy();
        game.start(gameOverSpy);
      });

      it('calls "game over" callback when clicking on a mine', () => {
        // Click a bomb
        game.click(1, 0);

        expects(gameOverSpy.calledOnce, 'to be true');
        let result = gameOverSpy.args[0][0];
        expects(result.victory, 'to be', false);
        expects(result.killerTile, 'to equal', [1, 0]);
        expects(result.elapsedTime, 'not to be undefined');
      });

      it('calls "game over" callback when all of the board is revealed (except for the mines)', () => {
        const totallyRevealedBoard = [
          [3, B, 3, 1, 0],
          [B, B, B, 2, 1],
          [2, 3, 3, B, 1],
          [0, 0, 1, 1, 1],
          [0, 0, 0, 0, 0]
        ];

        // Reveal the board
        game.click(0, 0);
        game.click(4, 0);
        game.click(0, 4);
        game.click(0, 2);
        game.click(2, 4);

        expects(game.board(), 'to equal', totallyRevealedBoard);

        expects(gameOverSpy.calledOnce, 'to be true');

        let result = gameOverSpy.args[0][0];
        expects(result.victory, 'to be', true);
        expects(result.elapsedTime, 'not to be undefined');
      });
    });
  });
});
