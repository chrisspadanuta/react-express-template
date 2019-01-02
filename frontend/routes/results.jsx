import React from 'react';

import './results.scss';
import adminService from '../services/admin-service';
import {convertToHumanReadable} from '../utils/date-utils';

class Results extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        questions: [],
      },
      submissions: [],
      activePoll: 1,
    };

    this.closeStatus = this.closeStatus.bind(this);
  }

  async componentDidMount() {
    this.loadResults();
  }

  async loadResults() {
    Promise.all([
      adminService.loadPoll(),
      adminService.loadSubmissions()
    ]).then(([poll, submissions]) => {
      this.setState({
        poll: poll,
        submissions: submissions,
      });
    });
  }

  closeStatus() {
    this.setState({
      status: null
    })
  }

  buildToggleSubmission(index) {
    return (e) => {
      this.setState({
        activePoll: index === this.state.activePoll ? null : index,
      });
    }
  }

  renderStatusArea(status) {
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

  renderChoices(question, chosenAnswer) {
    return question.choices.map((choice, index) => {
      return (
        <div key={index} className={'choice' + (index === question.correctAnswer ? ' correct' : '')}>
          <div className="mark">[{index === chosenAnswer ? 'X' : ' '}]</div>
          <div className="content">{choice}</div>
        </div>
      );
    });
  }

  renderSubmission(submission) {
    const answers = submission.answers.map((answer, index) => {
      return (
        <div key={index} className="question-box">
          <div className="question-content">{this.state.poll.questions[index].question}</div>
          <div className="question-choices">
            {this.renderChoices(this.state.poll.questions[index], answer)}
          </div>
          {index < submission.answers.length - 1 && <hr/>}
        </div>
      )
    });

    return (
      <div className="submission-body">
        {answers}
      </div>
    )
  }

  renderSubmissions(submissions) {
    if (!submissions || submissions.length === 0) {
      return (
        'Sorry, no poll submissions found'
      );
    }
    return submissions.map((submission, index) => {
      const isActive = index === this.state.activePoll;
      return (
        <div className="submission-box" key={index}>
          <div className={'submission-header' + (isActive ? ' expanded' : '')} onClick={this.buildToggleSubmission(index)}>
            <div className="toggle sub-item">{isActive ? '–' : '+'}</div>
            <div className="id sub-item">#{index + 1}</div>
            <div className="timestamp sub-item">{convertToHumanReadable(submission.timestamp)}</div>
          </div>
          {index === this.state.activePoll && this.renderSubmission(submission)}
        </div>
      );
    });
  }

  render() {
    if (!this.state.poll) {
      return (
        <div>Loading ...</div>
      );
    }

    return (
      <React.Fragment>
        <h1>Results</h1>
        <div className="layout">
          <div className="content">
            {this.renderStatusArea(status)}
            <div className="submissions-area">
              {this.renderSubmissions(this.state.submissions)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Results;