import expects from 'unexpected';

import Board from '../src/Board.js';

describe('Board', () => {
  describe('new', () => {
    it('has all zeros', () => {
      const zeroBoard = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
      ];
      let subject = new Board();

      expects(subject.state, 'to equal', zeroBoard);
    });
  });

  describe('#mine', () => {
    let subject = new Board();
    subject.mine(1,1);

    it('adds a mine to the board', () => {
      expects(subject.state[1][1], 'to equal', 'M');
    });

    it('updates the surrounding board', () => {
      const minedBoard = [
          [1, 1, 1, 0, 0],
          [1, 'M', 1, 0, 0],
          [1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
      ];
      expects(subject.state, 'to equal', minedBoard);
    });

    it('allows mines in corners', () => {
      subject.mine(0,0);
      subject.mine(4,0);
      subject.mine(0,4);
      subject.mine(4,4);

      const minedBoard = [
          ['M', 2, 1, 1, 'M'],
          [2, 'M', 1, 1, 1],
          [1, 1, 1, 0, 0],
          [1, 1, 0, 1, 1],
          ['M', 1, 0, 1, 'M']
      ];
      expects(subject.state, 'to equal', minedBoard);
    });

    it('does nothing with duplicate mine placement', () => {
      subject.mine(0,0);

      const minedBoard = [
          ['M', 2, 1, 1, 'M'],
          [2, 'M', 1, 1, 1],
          [1, 1, 1, 0, 0],
          [1, 1, 0, 1, 1],
          ['M', 1, 0, 1, 'M']
      ];
      expects(subject.state, 'to equal', minedBoard);
    });

    it('does nothing with out-of-bounds mine placement', () => {
      subject.mine(5,1);

      const minedBoard = [
          ['M', 2, 1, 1, 'M'],
          [2, 'M', 1, 1, 1],
          [1, 1, 1, 0, 0],
          [1, 1, 0, 1, 1],
          ['M', 1, 0, 1, 'M']
      ];
      expects(subject.state, 'to equal', minedBoard);
    });
  });

  describe('#isZero', () => {
    let subject = new Board();
    subject.mine(1, 1);

    it('returns true for zero square', () => {
      expects(subject.isZero(3, 0), 'to be', true);
    });

    it('returns false for non-zero, non-bomb square', () => {
      expects(subject.isZero(0, 0), 'to be', false);
    });

    it('returns false for bomb square', () => {
      expects(subject.isZero(1, 1), 'to be', false);
    });

    it('return false for out-of-bounds position', () => {
      expects(subject.isZero(-1, 5), 'to be', false);
    });
  });
});
