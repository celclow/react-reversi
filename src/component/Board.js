import React from 'react';
import ReactDOM from 'react-dom';
import Disk from './Disk';
import { reversiLogic, toBoardIndex } from '../logic/reversiLogic';
import config from '../config.json';
import { EnumDisk } from '../enum/EnumDisk';

export default class Board extends React.Component {

  constructor(props) {
    super(props);

    let initBoardState = Array(config['board.size'] * config['board.size']).fill(EnumDisk.Empty);
    initBoardState[toBoardIndex(3, 3)] = EnumDisk.White;
    initBoardState[toBoardIndex(3, 4)] = EnumDisk.Black;
    initBoardState[toBoardIndex(4, 3)] = EnumDisk.Black;
    initBoardState[toBoardIndex(4, 4)] = EnumDisk.White;
    this.state = {
      boardState: initBoardState
    };

    // イベントバインド
    /** クリック時のイベント */
    this.onClick = this.onClick.bind(this);
  }

  onClick(e, row, col) {
    //console.log(EnumDisk);
    this.setState(
      {
        boardState: reversiLogic(this.state.boardState, row, col)
      });
    //console.log(this.state);
    //console.log(row, col);
  }

  render() {
    return (
      <div className="board">
        {
          this.state.boardState.map((val, i) => {
            return <Disk
              key={i}
              col={i % config['board.size']}
              row={parseInt(i / config['board.size'])}
              onClick={this.onClick}
              value={val}
            />
          })
        }
      </div>
    );
  }
}

