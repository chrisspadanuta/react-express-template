import log from './logger'

let savedAnswers = [];

function retrievePoll(id) {
  log('retrievePoll', savedAnswers[id]);
  return savedAnswers[id];
}

function saveAnswers(answers) {
  log('saveAnswers', answers);
  savedAnswers.push({
    timestamp: new Date(),
    answers,
  });
}

export default {
  retrievePoll,
  saveAnswers
}