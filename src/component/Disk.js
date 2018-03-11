import React from 'react';
import ReactDOM from 'react-dom';

class Disk extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="disk" onClick={e => this.props.onClick(e, this.props.row, this.props.col)}>
        {this.props.value}
      </div >
    );
  }
}


export default Disk;