import log from './logger'

//import makeshiftStorage from '../persist/makeshift-storage';

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
  //makeshiftStorage.setQuestions(poll);
  //log('makeshift storage', makeshiftStorage.getQuestions());
}

export default {
  retrievePoll,
  savePoll
}