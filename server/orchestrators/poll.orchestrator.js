import log from '../services/logger'

import questionsService from '../services/questions.service';

function retrievePollWithoutAnswers() {
  const poll = questionsService.retrievePoll();
  log('retrievePollWithoutAnswers', poll.questions);
  const questionsWithoutAnswers = poll.questions.map((item) => {
    return {
      question: item.question,
      choices: item.choices,
    }
  });

  return {
    questions: questionsWithoutAnswers
  }
}

export default {
  retrievePollWithoutAnswers,
}