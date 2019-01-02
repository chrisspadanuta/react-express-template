import React from 'react';

import './admin.scss';
import PollQuestion from '../components/poll-question';
import pollService from '../services/poll-service';

function createQuestion() {
  return { question: '', choices: ['', '', '', ''], correctAnswer: 0 }
}

class Poll extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        questions: [
          createQuestion(),
        ],
      },
      answers: [null],
    };

    this.saveAnswers = this.saveAnswers.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.closeStatus = this.closeStatus.bind(this);
  }

  async componentDidMount() {
    this.loadPoll();
  }

  async loadPoll() {
    try {
      const poll = await pollService.loadQuestions();
      this.setState({
        poll: poll,
        answers: new Array(poll.questions.length),
      });
    } catch (e) {
      this.setState({
        status: {
          error: true,
          message: e.message
        }
      });
    }
  }

  async saveAnswers() {
    const answers = this.state.poll.questions.map(item => item.chosenAnswer);
    try {
      const statusMessage = await pollService.saveAnswers(answers);
      this.setState({
        status: {
          error: false,
          message: statusMessage,
        }
      });
    } catch (e) {
      this.setState({
        status: {
          error: true,
          message: e.message
        }
      });
    }
  }

  updateAnswer(chosenAnswer, index) {
    this.setState((prevState) => {
      const oldQuestions = prevState.poll.questions;

    console.log('updated: ', {poll: {
      questions: [
        ...oldQuestions.slice(0, index),
        { ...oldQuestions[index], chosenAnswer },
        ...oldQuestions.slice(index + 1),
      ]
    }});

      return {
        poll: {
          questions: [
            ...oldQuestions.slice(0, index),
            { ...oldQuestions[index], chosenAnswer },
            ...oldQuestions.slice(index + 1),
          ]
        }
      }
    });
  }

  closeStatus() {
    this.setState({
      status: null
    })
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

  renderQuestions(questions) {
    return questions.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <PollQuestion
              index={index}
              question={item.question}
              choices={item.choices}
              chosenAnswer={item.chosenAnswer}
              updateAnswer={this.updateAnswer}
            />
            <hr/>
          </React.Fragment>
        );
    });
  }

  render() {
    if (!this.state.poll) {
      return (
        <div>Loading ...</div>
      );
    }

    const questions = this.state.poll.questions;
    const status = this.state.status;

    return (
      <React.Fragment>
        <h1>Poll page</h1>
        <div className="layout">
          <div className="content">
            {this.renderStatusArea(status)}
            <div className="questions-area">
              {this.renderQuestions(questions)}
            </div>
            <hr/>
            <button type="submit" className="save-button" onClick={this.saveAnswers}>Save</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Poll;