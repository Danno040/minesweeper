import React from 'react';
import MinesweeperGame from '../Minesweeper';
import Header from './Header.jsx';
import Board from './Board.jsx';

export default class MinesweeperWrapper extends React.Component {
  constructor() {
    super();

    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleBoardClick(row, column) {
    if (!this.props.game.started) {
      this.props.game.start(this.handleGameOver);
    }

    this.props.game.click(row, column);
    this.forceUpdate();
  }

  handleGameOver(result) {
    if (result.victory) {
      alert('You won! It took ' + result.elapsedTime + '!');
      return;
    }

    alert('Wop-wa. You hit a mine.');
  }

  handleReset() {
    this.props.game.reset();

    this.forceUpdate();
  }

  render() {
    const { game } = this.props;
    return (
      <div>
        <Header bombCount={game.bombCount()} handleReset={this.handleReset} />
        <Board board={game.board()} handleBoardClick={this.handleBoardClick} />
      </div>
    );
  }
}

MinesweeperWrapper.propTypes = {
  game: React.PropTypes.instanceOf(MinesweeperGame)
};
