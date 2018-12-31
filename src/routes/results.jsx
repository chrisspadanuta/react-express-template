import React from 'react';

class Results extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('constructing results');
  }

  render() {
    return (
      <div>Results go here</div>
    );
  }
}

export default Results;