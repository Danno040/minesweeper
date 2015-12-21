import React from 'react';
import ReactDOM from 'react-dom';

import MinesweeperWrapper from './components/MinesweeperWrapper';
import Minesweeper from './Minesweeper';
import Board from './Board';

let board = new Board();
board.mine(0,1);
board.mine(1,0);
board.mine(1,1);
board.mine(1,2);
board.mine(2,3);

let game = new Minesweeper(board);

ReactDOM.render(<MinesweeperWrapper game={game} />, document.getElementById('content'));
