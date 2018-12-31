const base = '/api';

function buildPath(path) {
  return base + path;
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`${resonse.status}: ${response.statusText}`);
  }
  return response.json();
}

function get(path) {
  return fetch(buildPath(path), {
    method: 'GET'
  }).then(handleResponse);
}

function post(path, body) {
  return fetch(buildPath(path), {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  }).then(handleResponse);
}

export default {
  get,
  post,
};