import React from 'react';

import EditableQuestion from '../components/EditableQuestion';

class Admin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        { question: '', answers: ['', ''] },
      ],
    };
    
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    this.setState((prevState) => {
      return {
        questions: [...prevState.questions, ''],
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Admin page</h1>
        {this.state.questions.map((question, index) => {
          return <EditableQuestion key={index} question={question} updateCallback={this.updateQuestion}/>;
        })}
        <button type="button" onClick={this.addQuestion}>Add Question</button>
      </div>
    );
  }
}

export default Admin;