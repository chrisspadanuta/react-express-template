import React from 'react';
import PropTypes from 'prop-types';

class EditableQuestion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...props.question,
    };

    this.addAnswer = this.addAnswer.bind(this);
  }

  changeQuestion(e) {
    console.log(`target value: ${e.target.value}`);
  }

  changeAnswer(index) {
    return (e) => {
      console.log(`change answer: ${index}`, e.target);
      this.setState((prevState) => {
        const oldAnswers = prevState.answers;
        return {
          answers: [
            ...oldAnswers.slice(0, index),
            e.target,
            oldAnswers.slice(index + 1),
          ],
        };
      });
    };
  }

  addAnswer() {
    this.setState((prevState) => {
      return {
        answers: [...prevState.answers, ''],
      };
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>Admin page</div>
        <textarea onChange={this.changeQuestion} value={this.state.question}/>
        {this.state.answers.map((answer, index) => {
          return <input key={index} type="text" value={answer} onChange={this.changeAnswer(index)} />;
        })}
        <button type="button" onClick={this.addAnswer}>Add Answer</button>
      </React.Fragment>
    );
  }
}

EditableQuestion.propTypes = {
  question: PropTypes.object,
};

export default EditableQuestion;