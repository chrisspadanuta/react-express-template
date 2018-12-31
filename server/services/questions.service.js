let savedPoll = {
  questions: [
    {
      question: '',
      choices: ['', '', '', ''],
      answer: 0,
    }
  ]
};

function retrievePoll() {
  return savedPoll;
}

function savePoll(poll) {
  savedPoll = poll;
}

export default {
  retrievePoll,
  savePoll
}