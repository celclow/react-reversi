import React from 'react';
import ReactDOM from 'react-dom';
import Disk from './Disk';

class Board extends React.Component {


    constructor(props) {
        super(props);
    }

    static getBoardSize() {
        return 8;
    }

    render() {
        return (
            <div className="board">
                {
                    [...Array(Board.getBoardSize()).keys()].map(rownum => {
                        return [...Array(Board.getBoardSize()).keys()].map(colnum => {
                            return <Disk row={rownum} col={colnum} />
                        })
                    })
                }
            </div>
        );
    }
}

export default Board;
