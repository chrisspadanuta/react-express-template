import React from 'react';

import './admin.scss';
import EditableQuestion from '../components/editable-question';
import adminService from '../services/admin-service';

function createQuestion() {
  return { question: '', choices: ['', '', '', ''], correctAnswer: 0 }
}

class Admin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        questions: [
          createQuestion(),
        ],
      },
      validAnswers: [false],
    };

    this.removeQuestion = this.removeQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.savePoll = this.savePoll.bind(this);
    this.closeStatus = this.closeStatus.bind(this);
  }

  async componentDidMount() {
    this.loadPoll();
  }

  async loadPoll() {
    try {
      const poll = await adminService.loadPoll();
      this.setState({
        poll: poll,
        validAnswers: poll.questions.map(item => typeof item.correctAnswer !== 'undefined' && item.correctAnswer >= 0),
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

  async savePoll() {
    try {
      const statusMessage = await adminService.savePoll(this.state.poll);
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

  removeQuestion() {
    this.setState((prevState) => {
      return {
        poll: {
          questions: [...prevState.poll.questions.slice(0, -1)],
        },
        validAnswers: [...prevState.validAnswers.slice(0, -1)],
      };
    });
  }

  addQuestion() {
    this.setState((prevState) => {
      return {
        poll: {
          questions: [...prevState.poll.questions, createQuestion()],
        },
        validAnswers: [...prevState.validAnswers, false],
      };
    });
  }

  updateQuestion(item, index) {
    const correctAnswerValid = item.correctAnswer != null && item.correctAnswer >= 0;

    this.setState((prevState) => {
      const oldQuestions = prevState.poll.questions;
      const oldValidAnswers = prevState.validAnswers;
      return {
        poll: {
          questions: [
            ...oldQuestions.slice(0, index),
            item,
            ...oldQuestions.slice(index + 1),
          ]
        },
        validAnswers: [
          ...oldValidAnswers.slice(0, index),
          correctAnswerValid,
          ...oldValidAnswers.slice(index + 1),
        ]
      }
    });
    console.log('validAnswers', this.state.validAnswers);
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
            <EditableQuestion
              index={index}
              question={item.question}
              choices={item.choices}
              correctAnswer={item.correctAnswer}
              updateQuestion={this.updateQuestion}
            />
            <hr/>
          </React.Fragment>
        );
    });
  }

  renderQuestionsToolbar(questions) {
    return (
      <div className="question-toolbar">
        {questions.length > 1 ? <button type="button" className="remove" onClick={this.removeQuestion}>Remove Question</button> : null}
        <button type="button" className="add" onClick={this.addQuestion}>Add Question</button>
      </div>
    )
  }

  render() {
    if (!this.state.poll) {
      return (
        <div>Loading ...</div>
      );
    }

    const questions = this.state.poll.questions;
    const status = this.state.status;
    const allQuestionsAnswered = !this.state.validAnswers.includes(false);

    return (
      <React.Fragment>
        <h1>Poll Administration</h1>
        <div className="layout">
          <div className="content">
            {this.renderStatusArea(status)}
            <div className="questions-area">
              {this.renderQuestions(questions)}
              {this.renderQuestionsToolbar(questions)}
            </div>
            <hr/>
            <button type="submit" className="save-button" onClick={this.savePoll} disabled={!allQuestionsAnswered}>Save</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;