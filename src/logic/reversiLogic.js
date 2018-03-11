import { EnumDisk } from '../component/Board';
import config from '../config.json';

export function reversiLogic(boardState, row, col) {

  boardState[toBoardIndex(row, col)] = EnumDisk.Black;

  return boardState;
}

export function toBoardIndex(row, col) {
  return row * config['board.size'] + col;
}