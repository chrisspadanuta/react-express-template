import React from 'react';
import Sum from '../components/Sum';
import Difference from '../components/Difference';
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
        <Sum a={1} b={2} />
        <Difference a={7} b={3} />
      </div>
    );
  }
}

export default Home;
