import React from 'react';

class Admin extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('constructing results');
  }

  render() {
    return (
      <div>Admin page</div>
    );
  }
}

export default Admin;