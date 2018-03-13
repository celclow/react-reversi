import { DiskType } from '../enum/DiskType';
import config from '../config.json';

/** リバーシロジック */
export function reversiLogic(boardState, putDiskType, putRow, putCol) {
  return getNextBoardState(boardState, putDiskType, putRow, putCol);
}

//** 座標をindexへ変換 */
export function toBoardIndex(row, col) {
  return row * config['board.size'] + col;
}

/** 次の盤面を取得 */
function getNextBoardState(boardState, putDiskType, putRow, putCol) {

  // EMPTY以外はfalse
  if (boardState[toBoardIndex(putRow, putCol)] !== DiskType.Empty) {
    return boardState;
  }

  /** 次の盤面 */
  let nextBoardState = Object.assign([], boardState);

  /** 自分の石の色 */
  let myDiskType = putDiskType;
  /** 相手の石の色 */
  let yourDiskType = getYourDiskType(putDiskType);


  // 裏返し処理
  let reverseProc = function (nextBoardState, myDiskType, putRow, putCol, rowDirection, colDirection) {
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (
      let row = putRow + rowDirection, col = putCol + colDirection;
      0 <= row && row < config['board.size'], 0 <= col && col < config['board.size'];
      row = row + rowDirection, col = col + colDirection
    ) {
      if (tempBoardState[toBoardIndex(row, col)] === myDiskType) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === getYourDiskType(myDiskType)) {
        tempBoardState[toBoardIndex(row, col)] = myDiskType;
      } else {
        break;
      }
    }

    return nextBoardState;
  }
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, -1, 0);
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, 1, 0);
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, 0, -1);
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, 0, 1);
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, -1, -1);
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, 1, 1);
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, -1, 1);
  nextBoardState = reverseProc(nextBoardState, myDiskType, putRow, putCol, 1, -1);

  // 自分の石を置く。
  if (!equalsBoardState(boardState, nextBoardState)) {
    nextBoardState[toBoardIndex(putRow, putCol)] = myDiskType;
  }

  return nextBoardState;
}

/** 盤面の比較 */
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

/** 相手の石の色を取得 */
function getYourDiskType(myDiskType) {
  return myDiskType === DiskType.Black ? DiskType.White : DiskType.Black;
}

/** 次の相手の石の色を取得 */
export function nextDiskType(boardState, putDiskType, putRow, putCol) {

  putDiskType = getYourDiskType(putDiskType);

  for (let row = 0; row < config['board.size']; row++) {
    for (let col = 0; col < config['board.size']; col++) {
      if (canPut(boardState, putDiskType, row, col)) {
        return putDiskType;
      }
    }
  }

  return getYourDiskType(putDiskType);
}

/** 座標に石を置けるかを判定 */
export function canPut(boardState, putDiskType, putRow, putCol) {
  let nextBoardState = getNextBoardState(boardState, putDiskType, putRow, putCol);

  if (equalsBoardState(boardState, nextBoardState)) {
    return false;
  }

  return true;
}

