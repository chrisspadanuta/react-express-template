import React from 'react';
import PropTypes from 'prop-types';
import mathService from '../services/math-service';

class Difference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
    };
  }

  componentDidMount() {
    this.computeResult();
  }

  async computeResult() {
    const { a, b } = this.props;
    try {
      const result = await mathService.subtract(a, b);
      this.setState({
        result,
      });
    } catch (e) {
      console.log('error occurred for subtracting ', a, b);
    }
  }

  render() {
    const { result } = this.state;
    return <div>{result}</div>;
  }
}

Difference.propTypes = {
  a: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
};

export default Difference;
