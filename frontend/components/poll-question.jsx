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
    this.props.chooseAnswer(chosenIndex, this.props.index);
  }

  renderChoices(choices, chosenAnswer, questionIndex) {
    return (
      <div className="choices-area">
        {choices.map((choice, index) =>
          <div className="choice-box" key={index}>
            <input
              type="radio"
              className="answer-radio sub-item"
              id={`q${questionIndex}-choice-${index}`}
              name={`q${questionIndex}-choice`}
              value={index}
              onChange={this.setAnswer}
              checked={index === chosenAnswer}
            />
            <label htmlFor={`q${questionIndex}-choice-${index}`} className="answer-content sub-item">{choice}</label>
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
  chooseAnswer: PropTypes.func,
};

export default PollQuestion;