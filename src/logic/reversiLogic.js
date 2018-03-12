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
  let yourEnumDisk = yourTurn(putEnumDisk);

  // check →
  {
    let row = putRow;
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let col = putCol + 1; col < config['board.size']; col++) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }

  // check ←
  {
    let row = putRow;
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let col = putCol - 1; col < config['board.size']; col--) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }
  // check ↓
  {
    let col = putCol;
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let row = putRow + 1; row < config['board.size']; row++) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }
  // check ↑
  {
    let col = putCol;
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let row = putRow - 1; row < config['board.size']; row--) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }
  // check ↘
  {
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let row = putRow + 1, col = putCol + 1; row < config['board.size'], col < config['board.size']; row++ , col++) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }

  // check ↖
  {
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let row = putRow - 1, col = putCol - 1; row < config['board.size'], col < config['board.size']; row-- , col--) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }

  // check ↗
  {
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let row = putRow - 1, col = putCol + 1; row < config['board.size'], col < config['board.size']; row-- , col++) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }

  // check ↙
  {
    let isDiffNext = false;
    let tempBoardState = Object.assign([], nextBoardState);
    for (let row = putRow + 1, col = putCol - 1; row < config['board.size'], col < config['board.size']; row++ , col--) {
      if (tempBoardState[toBoardIndex(row, col)] === myEnumDisk) {
        nextBoardState = Object.assign([], tempBoardState);
        break;
      } else if (tempBoardState[toBoardIndex(row, col)] === yourEnumDisk) {
        tempBoardState[toBoardIndex(row, col)] = myEnumDisk;
      } else {
        break;
      }
    }
  }

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

function yourTurn(myEnumDisk) {
  return myEnumDisk === EnumDisk.Black ? EnumDisk.White : EnumDisk.Black;
}

export function nextTurn(boardState, putEnumDisk, putRow, putCol) {

  for (let row = 0; row < config['board.size']; row++) {
    for (let col = 0; col < config['board.size']; col++) {
      if (canPut(boardState, putEnumDisk, putRow, putCol)) {
        return yourTurn(putEnumDisk);
      }
    }
  }

  return putEnumDisk
}

export function canPut(boardState, putEnumDisk, putRow, putCol) {
  let nextBoardState = getNextBoardState(boardState, putEnumDisk, putRow, putCol);

  if (equalsBoardState(boardState, nextBoardState)) {
    return false;
  }

  return true;
}