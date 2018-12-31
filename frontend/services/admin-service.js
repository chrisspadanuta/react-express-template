import apiService from './api-service'

function loadQuestions() {
  return apiService.get('/admin')
    .then(res => res.json());
}

function saveQuestions(quiz) {
  return apiService.post('/admin', quiz)
    .then(res => res.json());
}

export default {
  loadQuestions,
  saveQuestions,
}