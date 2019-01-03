import React from 'react';

import './status-page-template.scss';

function buildPageWithStatus(WrappedComponent, title) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {}

      this.closeStatus = this.closeStatus.bind(this);
      this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    }

    handleStatusUpdate(error, message) {
      this.setState({
        status: {
          error,
          message,
        }
      });
    }

    closeStatus() {
      this.setState({
        status: null
      });
    }

    renderStatusArea() {
      const status = this.state.status;
      if (!status) {
        return null;
      }
  
      const className = (status.error ? 'error ' : '') + 'status-area';
  
      return (
        <div className={className}>
          {status.message}
          <div className="close" onClick={this.closeStatus}>&times;</div>
        </div>
      );
    }

    render() {
      return (
        <React.Fragment>
          <h1>{title}</h1>
          <div className="layout">
            <div className="content">
              {this.renderStatusArea()}
              <WrappedComponent {...this.props} updateStatus={this.handleStatusUpdate}/>
            </div>
          </div>
        </React.Fragment>
      )
    }
  };
}

export default buildPageWithStatus;