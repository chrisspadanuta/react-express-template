import React from 'react';
import PropTypes from 'prop-types';

import './editable-question.scss';

class EditableQuestion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeQuestion = this.changeQuestion.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.addChoice = this.addChoice.bind(this);
  }

  changeQuestion(e) {
    let value = e.target.value;
    console.log(`target value: ${e.target.value}`);

    const oldChoices = this.props.item.choices;
    const item = {
      question: value,
      choices: [...oldChoices],
    };
    this.props.updateQuestion(item, this.props.index);
  }

  changeAnswer(index) {
    return (e) => {
      let value = e.target.value;

      const oldChoices = this.props.item.choices;
      const item = {
        question: this.props.item.question,
        choices: [
          ...oldChoices.slice(0, index),
          value,
          ...oldChoices.slice(index + 1),
        ],
      };
      this.props.updateQuestion(item, this.props.index);
    };
  }

  removeChoice() {
    const item = {
      question: this.props.item.question,
      choices: [...this.props.item.choices.slice(0, -1)],
    };
    this.props.updateQuestion(item, this.props.index);
  }

  addChoice() {
    const item = {
      question: this.props.item.question,
      choices: [...this.props.item.choices, ''],
    };
    this.props.updateQuestion(item, this.props.index);
  }

  renderAnswers() {
    return this.props.item.choices.map((answer, index) => {
      return (
        <div className="answer-box" key={index}>
          <div className="label sub-item">#{index + 1}</div>
          <input type="text" className="input-box sub-item" value={answer} onChange={this.changeAnswer(index)} />
        </div>
      );
    })
  }

  render() {
    const { item, index } = this.props;
    return (
      <div className="editable-question">
        <h2>Question #{index + 1}</h2>
        <textarea className="question-box" onChange={this.changeQuestion} value={item.question}/>
        <h3>Choices</h3>
        {this.renderAnswers(item.answers)}
        <div className="answer-toolbar">
          {item.choices.length > 2 ? <button type="button" className="remove" onClick={this.removeChoice}>Remove Choice</button> : null}
          {item.choices.length < 6 ? <button type="button" className="add" onClick={this.addChoice}>Add Choice</button> : null}
        </div>
      </div>
    );
  }
}

EditableQuestion.propTypes = {
  item: PropTypes.object,
  updateQuestion: PropTypes.func,
};

export default EditableQuestion;