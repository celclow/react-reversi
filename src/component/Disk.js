import React from 'react';
import ReactDOM from 'react-dom';

class Disk extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="disk" onClick={this.props.onClick}>
        {this.props.value}
      </div >
    );
  }
}


export default Disk;