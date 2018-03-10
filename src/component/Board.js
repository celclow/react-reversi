import React from 'react';
import ReactDOM from 'react-dom';
import Disk from './Disk';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="board">
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
                <Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk /><Disk />
            </div>
        );
    }
}

export default Board;
