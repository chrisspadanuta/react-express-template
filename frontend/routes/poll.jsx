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
      validAnswers: [false],
    };

    this.saveAnswers = this.saveAnswers.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
    //this.closeStatus = this.closeStatus.bind(this);
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
        validAnswers: poll.questions.map(() => false),
      });
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

  async saveAnswers() {
    const answers = this.state.poll.questions.map(item => item.chosenAnswer);
    try {
      const statusMessage = await pollService.saveAnswers(answers);
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

  chooseAnswer(chosenAnswer, index) {
    this.setState((prevState) => {
      const oldQuestions = prevState.poll.questions;
      const oldValidAnswers = prevState.validAnswers;
      return {
        poll: {
          questions: [
            ...oldQuestions.slice(0, index),
            { ...oldQuestions[index], chosenAnswer },
            ...oldQuestions.slice(index + 1),
          ]
        },
        validAnswers: [
          ...oldValidAnswers.slice(0, index),
          true,
          ...oldValidAnswers.slice(index + 1),
        ]
      }
    });
  }

  /*closeStatus() {
    this.setState({
      status: null
    })
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
            <PollQuestion
              index={index}
              question={item.question}
              choices={item.choices}
              chosenAnswer={item.chosenAnswer}
              chooseAnswer={this.chooseAnswer}
            />
            {index < questions.length - 1 && <hr/>}
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
    //const status = this.state.status;
    const allQuestionsAnswered = !this.state.validAnswers.includes(false);

    return (
      <React.Fragment>
        <div className="questions-area">
          {this.renderQuestions(questions)}
        </div>
        <hr/>
        <button type="submit" className="save-button" onClick={this.saveAnswers} disabled={!allQuestionsAnswered}>Submit</button>
      </React.Fragment>
    );
  }
}

export default Poll;