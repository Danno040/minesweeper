import Board from '../../src/Board';

let testBoard = new Board();
testBoard.mine(0,1);
testBoard.mine(1,0);
testBoard.mine(1,1);
testBoard.mine(1,2);
testBoard.mine(2,3);

export default testBoard;
