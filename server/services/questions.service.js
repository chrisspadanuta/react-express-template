import log from './logger'

let savedPoll = {
  questions: [
    {
      question: '',
      choices: ['', '', '', ''],
      correctAnswer: 0,
    }
  ]
};

function retrievePoll() {
  log('retrievePoll', savedPoll);
  return savedPoll;
}

function savePoll(poll) {
  log('savePoll', poll);
  savedPoll = poll;
}

export default {
  retrievePoll,
  savePoll
}