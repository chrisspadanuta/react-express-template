import React from 'react';

import './admin.scss';
import EditableQuestion from '../components/editable-question';

function createQuestion() {
  return { question: '', choices: ['', ''] }
}

class Admin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        createQuestion(),
      ],
      error: 'test error'
    };

    this.removeQuestion = this.removeQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
  }

  removeQuestion() {
    this.setState((prevState) => {
      return {
        questions: [...prevState.questions.slice(0, -1)],
      };
    });
  }

  addQuestion() {
    this.setState((prevState) => {
      return {
        questions: [...prevState.questions, createQuestion()],
      };
    });
  }

  updateQuestion(item, index) {
    console.log('updateQuestion ', item);
    this.setState((prevState) => {
      const oldQuestions = prevState.questions;
      return {
        questions: [
          ...oldQuestions.slice(0, index),
          item,
          ...oldQuestions.slice(index + 1),
        ]
      }
    });
  }

  saveQuestions() {

  }

  render() {
    return (
      <React.Fragment>
        <h1>Admin page</h1>
        <div className="layout">
          <div className="content">
            {this.state.error && <div className="error-area">{this.state.error}</div>}
            <div className="questions">
              {this.state.questions.map((question, index) => {
                return (
                  <React.Fragment key={index}>
                    <EditableQuestion item={question} index={index} updateQuestion={this.updateQuestion}/>
                    <hr/>
                  </React.Fragment>
                );
              })}
              <div className="question-toolbar">
                {this.state.questions.length > 1 ? <button type="button" className="remove" onClick={this.removeQuestion}>Remove Question</button> : null}
                <button type="button" className="add" onClick={this.addQuestion}>Add Question</button>
              </div>
            </div>
            <hr/>
            <button type="submit" className="save-button" onClick={this.saveQuestions}>Save</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;