import { EnumDisk } from '../component/Board';

export function reversiLogic(boardState, row, col) {

  boardState[toBoardIndex(row, col)] = EnumDisk.Black;

  return boardState;
}

export function toBoardIndex(row, col) {
  return row * 8 + col;
}