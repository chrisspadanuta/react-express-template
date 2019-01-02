import React from 'react';
import PropTypes from 'prop-types';

import './editable-question.scss';

class EditableQuestion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeQuestion = this.changeQuestion.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.setCorrectChoice = this.setCorrectChoice.bind(this);
  }

  changeQuestion(e) {
    let value = e.target.value;

    const oldChoices = this.props.choices;
    const item = {
      question: value,
      choices: [...oldChoices],
      correctAnswer: this.props.correctAnswer,
    };
    this.props.updateQuestion(item, this.props.index);
  }

  changeChoice(index) {
    return (e) => {
      let value = e.target.value;

      const oldChoices = this.props.choices;
      const item = {
        question: this.props.question,
        choices: [
          ...oldChoices.slice(0, index),
          value,
          ...oldChoices.slice(index + 1),
        ],
        correctAnswer: this.props.correctAnswer,
      };
      this.props.updateQuestion(item, this.props.index);
    };
  }

  removeChoice() {
    const item = {
      question: this.props.question,
      choices: [...this.props.choices.slice(0, -1)],
      correctAnswer: this.props.correctAnswer,
    };
    this.props.updateQuestion(item, this.props.index);
  }

  addChoice() {
    const item = {
      question: this.props.question,
      choices: [...this.props.choices, ''],
      correctAnswer: this.props.correctAnswer,
    };
    this.props.updateQuestion(item, this.props.index);
  }

  setCorrectChoice(e) {
    const index = Number.parseInt(e.target.value);
    const item = {
      question: this.props.question,
      choices: this.props.choices,
      correctAnswer: index,
    };
    this.props.updateQuestion(item, this.props.index);
  }

  renderChoices(choices, correct, questionIndex) {
    return (
      <div className="choices-area">
        <h3>Choices</h3>
        <div className="choices-header">
          <div className="header-correct">Correct</div>
          <div className="header-content"></div>
        </div>
        {choices.map((choice, index) =>
          <div className="choice-box" key={index}>
            <input type="radio" className="correct sub-item" name={`q${questionIndex}-choice`} onChange={this.setCorrectChoice} checked={index === correct} value={index}/>
            <input type="text" className="input-box sub-item" value={choice} onChange={this.changeChoice(index)} />
          </div>
        )}
      </div>
    );
  }

  render() {
    const { index, question, choices, correctAnswer } = this.props;
    return (
      <div className="editable-question">
        <h2>Question #{index + 1}</h2>
        <textarea className="question-box" onChange={this.changeQuestion} value={question} />
        {this.renderChoices(choices, correctAnswer, index)}
        <div className="choice-toolbar">
          {choices.length > 2 ? <button type="button" className="remove" onClick={this.removeChoice}>Remove Choice</button> : null}
          {choices.length < 6 ? <button type="button" className="add" onClick={this.addChoice}>Add Choice</button> : null}
        </div>
      </div>
    );
  }
}

EditableQuestion.propTypes = {
  index: PropTypes.number,
  question: PropTypes.string,
  choices: PropTypes.array,
  correctAnswer: PropTypes.number,
  updateQuestion: PropTypes.func,
};

export default EditableQuestion;