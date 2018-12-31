import React from 'react';

class Poll extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('constructing poll');
  }

  render() {
    return (
      <div>Polls</div>
    );
  }
}

export default Poll;