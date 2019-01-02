import apiService from './api-service'

async function loadQuestions() {
  try {
    const result = await apiService.get('/poll/questions');
    return result;
  } catch (e) {
    console.log(e);
    throw new Error('An error occurred loading your poll');
  }
}

async function saveAnswers(poll) {
  try {
    await apiService.post('/poll/answers', poll)
    return 'Saved answers successfully';
  } catch (e) {
    throw new Error('An error occurred saving your answers')
  }
}

export default {
  loadQuestions,
  saveAnswers,
}