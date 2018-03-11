import React from 'react';
import ReactDOM from 'react-dom';
import Disk from './Disk';

class Board extends React.Component {


  constructor(props) {
    super(props);

    /** ボードサイズ */
    this.BOARD_SIZE = 8;

    this.state = {
      boardState: Array(this.BOARD_SIZE * this.BOARD_SIZE).fill('o')
    };

    // イベントバインド
    /** クリック時のイベント */
    this.onClick = this.onClick.bind(this);
  }

  onClick(e, row, col) {
    this.setState({ boardState: Array(this.BOARD_SIZE * this.BOARD_SIZE).fill('x') });
    console.log(this.state);
    console.log(row, col);
  }

  render() {
    return (
      <div className="board">
        {
          this.state.boardState.map((val, i) => {
            return <Disk
              key={i}
              col={i % this.BOARD_SIZE}
              row={parseInt(i / this.BOARD_SIZE)}
              onClick={this.onClick}
              value={val}
            />
          })
        }
      </div>
    );
  }
}

export default Board;
