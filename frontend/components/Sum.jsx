import React from 'react';
import PropTypes from 'prop-types';

const Sum = ({ a, b }) => {
  return <div>{a + b}</div>;
};

Sum.propTypes = {
  a: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
};

export default Sum;
