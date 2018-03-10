import React from 'react';
import ReactDOM from 'react-dom';

class Disk extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      diskState: 'o'
    }
  }

  render() {
    return (
      <div className="disk">
        {this.state.diskState}
      </div>
    );
  }
}


export default Disk;