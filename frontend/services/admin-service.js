import apiService from './api-service'

async function loadPoll() {
  try {
    const result = await apiService.get('/admin/poll');
    return result;
  } catch (e) {
    throw new Error('An error occurred loading your poll');
  }
}

async function savePoll(poll) {
  try {
    await apiService.post('/admin/poll', poll)
    return 'Saved poll successfully';
  } catch (e) {
    throw new Error('An error occurred saving your poll')
  }
}

async function loadSubmissions() {
  try {
    const result = await apiService.get('/admin/submissions');
    return result;
  } catch (e) {
    throw new Error('An error occurred loading submissions');
  }
}

export default {
  loadPoll,
  savePoll,
  loadSubmissions,
}