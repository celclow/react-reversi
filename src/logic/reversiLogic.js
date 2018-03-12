import { EnumDisk } from '../enum/EnumDisk';
import config from '../config.json';

export function reversiLogic(boardState, putEnumDisk, row, col) {

  //boardState[toBoardIndex(row, col)] = EnumDisk.Black;

  return getNextBoardState(boardState, putEnumDisk, row, col);
}

export function toBoardIndex(row, col) {
  return row * config['board.size'] + col;
}

function getNextBoardState(boardState, putEnumDisk, putRow, putCol) {

  // EMPTY以外はfalse
  if (boardState[toBoardIndex(putRow, putCol)] !== EnumDisk.Empty) {
    return boardState;
  }

  /** 次の盤面 */
  let nextBoardState = Object.assign([], boardState);

  /** 自分の石の色 */
  let myEnumDisk = putEnumDisk;
  /** 相手の石の色 */
  let yourEnumDisk = getYourEnumDisk(putEnumDisk);


  // 裏返し処理
  let hogehoge = function (nextBoardState, myEnumDisk, putRow, putCol, rowDirection, colDirection) {
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (
      let row = putRow + rowDirection, col = putCol + colDirection;
      0 <= row && row < config['board.size'], 0 <= col && col < config['board.size'];
      row = row + rowDirection, col = col + colDirection
    ) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === getYourEnumDisk(myEnumDisk)) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }

    return nextBoardState;
  }
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, -1, 0);
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, 1, 0);
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, 0, -1);
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, 0, 1);
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, -1, -1);
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, 1, 1);
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, -1, 1);
  nextBoardState = hogehoge(nextBoardState, myEnumDisk, putRow, putCol, 1, -1);

  // 自分の石を置く。
  if (!equalsBoardState(boardState, nextBoardState)) {
    nextBoardState[toBoardIndex(putRow, putCol)] = myEnumDisk;
  }

  return nextBoardState;
}

function equalsBoardState(aBoard, bBoard) {
  for (let row = 0; row < config['board.size']; row++) {
    for (let col = 0; col < config['board.size']; col++) {
      if (aBoard[toBoardIndex(row, col)] !== bBoard[toBoardIndex(row, col)]) {
        return false;
      }
    }
  }

  return true;
}

function getYourEnumDisk(myEnumDisk) {
  return myEnumDisk === EnumDisk.Black ? EnumDisk.White : EnumDisk.Black;
}

export function nextTurn(boardState, putEnumDisk, putRow, putCol) {

  putEnumDisk = getYourEnumDisk(putEnumDisk);

  for (let row = 0; row < config['board.size']; row++) {
    for (let col = 0; col < config['board.size']; col++) {
      if (canPut(boardState, putEnumDisk, row, col)) {
        return putEnumDisk;
      }
    }
  }

  return getYourEnumDisk(putEnumDisk);
}

export function canPut(boardState, putEnumDisk, putRow, putCol) {
  let nextBoardState = getNextBoardState(boardState, putEnumDisk, putRow, putCol);

  if (equalsBoardState(boardState, nextBoardState)) {
    return false;
  }

  return true;
}

