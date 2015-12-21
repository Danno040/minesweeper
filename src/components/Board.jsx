import React from 'react';
import { BLANK_TILE as B, MINED_TILE as M, EXPLODED_MINE_TILE as EM} from '../constants/tiles';

export default class Board extends React.Component {
  constructor() {
    super();

    this.renderRows = this.renderRows.bind(this);
    this.renderRowItems = this.renderRowItems.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderRows() {
    return this.props.board.map((row, i) => {
      return (
        <div className={'row'} key={'row-' + (i+1)}>
          {this.renderRowItems(row, i)}
        </div>
      );
    });
  }

  renderRowItems(row, rowIndex) {
    return row.map((item, i) => {
      return (
        <div className={'tile'} key={'row-' + (rowIndex+1) + '-column-' + (i+1)} onClick={this.handleClick}>
          <img src={'./images/' + this.itemImage(item)} data-row={rowIndex} data-column={i} />
        </div>
      );
    });
  }

  handleClick(event) {
    let target = event.target;
    let row = parseInt(target.getAttribute('data-row'));
    let column = parseInt(target.getAttribute('data-column'));
    this.props.handleBoardClick(row, column);
  }

  itemImage(item) {
    if (item == B) {
      return 'blank.jpg';
    } else if(item == M) {
      return 'exposedBomb.jpg';
    } else if(item == EM) {
      return 'explodedBomb.jpg';
    } else {
      return  item + 'Tile.jpg';
    }
  }

  render() {
    return (
      <section id={'board'}>
        {this.renderRows()}
      </section>
    );
  }
}

Board.propTypes = {
  board: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
    )
  ).isRequired,
  handleBoardClick: React.PropTypes.func.isRequired
};
