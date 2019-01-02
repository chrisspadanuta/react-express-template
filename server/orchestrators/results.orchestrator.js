import questionsService from '../services/questions.service'
import answersService from '../services/answers.service'

function retrievePoll(id) {
  const poll = questionsService.retrievePoll();
  const pollAnswers = answersService.retrievePoll(id);
  return {
    ...poll,
    result: {
      ...pollAnswers,
    }
  };
}

export default {
  retrievePoll,
}