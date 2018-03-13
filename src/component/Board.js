import React from 'react';
import ReactDOM from 'react-dom';
import Disk from './Disk';
import { reversiLogic, toBoardIndex, nextDiskType, canPut } from '../logic/reversiLogic';
import config from '../config.json';
import { DiskType } from '../enum/DiskType';

export default class Board extends React.Component {

  constructor(props) {
    super(props);

    let initBoardState = Array(config['board.size'] * config['board.size']).fill(DiskType.Empty);
    initBoardState[toBoardIndex(3, 3)] = DiskType.White;
    initBoardState[toBoardIndex(3, 4)] = DiskType.Black;
    initBoardState[toBoardIndex(4, 3)] = DiskType.Black;
    initBoardState[toBoardIndex(4, 4)] = DiskType.White;
    this.state = {
      boardState: initBoardState,
      nowDiskType: DiskType.Black
    };

    // イベントバインド
    /** クリック時のイベント */
    this.onClick = this.onClick.bind(this);
  }

  onClick(e, row, col) {
    //console.log(DiskType);

    if (canPut(this.state.boardState, this.state.nowDiskType, row, col)) {
      let tempBoardState = reversiLogic(this.state.boardState, this.state.nowDiskType, row, col);
      this.setState(
        {
          boardState: tempBoardState,
          nowDiskType: nextDiskType(tempBoardState, this.state.nowDiskType)
        });
    }
    //console.log(this.state);
    //console.log(row, col);
  }

  render() {
    return (
      <div>
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
        <div>
          {this.state.nowDiskType.value}
        </div>
      </div>
    );
  }
}

