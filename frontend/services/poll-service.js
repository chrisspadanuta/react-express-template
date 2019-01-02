import apiService from './api-service'

async function loadPoll() {
  try {
    const result = await apiService.get('/poll');
    return result;
  } catch (e) {
    throw new Error('An error occurred loading your poll');
  }
}

async function saveAnswers(poll) {
  try {
    await apiService.post('/poll', poll)
    return 'Saved answers successfully';
  } catch (e) {
    throw new Error('An error occurred saving your answers')
  }
}

export default {
  saveAnswers,
}