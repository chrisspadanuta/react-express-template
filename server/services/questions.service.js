import log from './logger'

// Makeshift storage.  For a real service we'd store this in a relational database or MongoDB
let savedPoll = null;

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