import apiService from './api-service';

async function subtract(a, b) {
  try {
    const rawResult = await apiService.post('/subtract', { a, b });
    const { result } = rawResult;
    return result;
  } catch (e) {
    throw new Error('An error occurred subtracting', e);
  }
}

export default {
  subtract,
};
