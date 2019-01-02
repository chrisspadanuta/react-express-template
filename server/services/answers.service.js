import log from './logger'

let savedAnswers = [];

function retrieveAll() {
  return savedAnswers;
}

function retrievePoll(id) {
  //log('retrievePoll', savedAnswers[id]);
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
  retrieveAll,
  retrievePoll,
  saveAnswers
}