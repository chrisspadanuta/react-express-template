import React from 'react';
import PropTypes from 'prop-types';

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
      validation: {
        questions: [false],
        answers: [false],
        choices: [false],
      },
    };

    this.removeQuestion = this.removeQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.savePoll = this.savePoll.bind(this);
    //this.closeStatus = this.closeStatus.bind(this);
  }

  async componentDidMount() {
    this.loadPoll();
  }

  async loadPoll() {
    try {
      const poll = await adminService.loadPoll();
      if (poll) {
        this.setState({
          poll: poll,
          validation: {
            questions: poll.questions.map(() => true),
            choices: poll.questions.map(() => true),
            answers: poll.questions.map(() => true),
          },
        });
      }
    } catch (e) {
      /*this.setState({
        status: {
          error: true,
          message: e.message
        }
      });*/
      this.props.updateStatus(true, e.message);
    }
  }

  async savePoll() {
    try {
      const statusMessage = await adminService.savePoll(this.state.poll);
      /*this.setState({
        status: {
          error: false,
          message: statusMessage,
        }
      });*/
      this.props.updateStatus(false, statusMessage);
    } catch (e) {
      /*this.setState({
        status: {
          error: true,
          message: e.message
        }
      });*/
      this.props.updateStatus(true, e.message);
    }
  }

  removeQuestion() {
    this.setState((prevState) => {
      return {
        poll: {
          questions: [...prevState.poll.questions.slice(0, -1)],
        },
        validation: {
          questions: [...prevState.validation.questions.slice(0, -1)],
          choices: [...prevState.validation.choices.slice(0, -1)],
          answers: [...prevState.validation.answers.slice(0, -1)],
        }
      };
    });
  }

  addQuestion() {
    this.setState((prevState) => {
      return {
        poll: {
          questions: [...prevState.poll.questions, createQuestion()],
        },
        validation: {
          questions: [...prevState.validation.questions, false],
          choices: [...prevState.validation.choices, false],
          answers: [...prevState.validation.answers, false],
        },
      };
    });
  }

  updateQuestion(item, index) {
    this.setState((prevState) => {
      return {
        poll: {
          questions: [
            ...prevState.poll.questions.slice(0, index),
            item,
            ...prevState.poll.questions.slice(index + 1),
          ],
        },
        validation: {
          questions: [
            ...prevState.validation.questions.slice(0, index),
            !!item.question,
            ...prevState.validation.questions.slice(index + 1),
          ],
          choices: [
            ...prevState.validation.choices.slice(0, index),
            !item.choices.includes(''),
            ...prevState.validation.choices.slice(index + 1),
          ],
          answers: [
            ...prevState.validation.answers.slice(0, index),
            item.correctAnswer != null && item.correctAnswer >= 0,
            ...prevState.validation.answers.slice(index + 1),
          ],
        }
      }
    });
  }

  /*closeStatus() {
    this.setState({
      status: null
    });
  }*/

  /*renderStatusArea(status) {
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
  }*/

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
    //const status = this.state.status;
    const allQuestionsFilledOut = !this.state.validation.questions.includes(false);
    const allQuestionsChoicesValid = !this.state.validation.choices.includes(false);
    const allQuestionsHaveAnswers = !this.state.validation.answers.includes(false);
    const pollValid = allQuestionsFilledOut && allQuestionsChoicesValid && allQuestionsHaveAnswers;

    return (
      <React.Fragment>
        <div className="questions-area">
          {this.renderQuestions(questions)}
          {this.renderQuestionsToolbar(questions)}
        </div>
        <hr/>
        <button type="submit" className="save-button" onClick={this.savePoll} disabled={!pollValid}>Save</button>
      </React.Fragment>
    );
  }
}

Admin.propTypes = {
  updateStatus: PropTypes.func,
};

export default Admin;