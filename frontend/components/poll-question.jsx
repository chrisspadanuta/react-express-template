import React from 'react';
import PropTypes from 'prop-types';

import './poll-question.scss';

class PollQuestion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setAnswer = this.setAnswer.bind(this);
  }

  setAnswer(e) {
    const chosenIndex = Number.parseInt(e.target.value);
    this.props.updateAnswer(chosenIndex, this.props.index);
  }

  renderChoices(choices, chosenAnswer, questionIndex) {
    return (
      <div className="choices-area">
        {choices.map((choice, index) =>
          <div className="choice-box" key={index}>
            <input type="radio" className="answer-radio sub-item" name={`q${questionIndex}-choice`} onChange={this.setAnswer} checked={index === chosenAnswer} value={index}/>
            <div className="answer-content sub-item">{choice}</div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { index, question, choices, chosenAnswer } = this.props;
    return (
      <div className="poll-question">
        <div className="question">{question}</div>
        {this.renderChoices(choices, chosenAnswer, index)}
      </div>
    );
  }
}

PollQuestion.propTypes = {
  index: PropTypes.number,
  question: PropTypes.string,
  choices: PropTypes.array,
  chosenAnswer: PropTypes.number,
  updateAnswer: PropTypes.func,
};

export default PollQuestion;