import React from 'react';

import './home.scss';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    // re-bindings to this go here
  }

  render() {
    return (
      <div className="main">
        Hello World!
      </div>
    );
  }
}

export default Home;