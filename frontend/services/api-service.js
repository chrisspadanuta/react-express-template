import 'whatwg-fetch';

const base = '/api';

function buildPath(path) {
  return base + path;
}

function handleResponse(response) {
  console.log('handling response');
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
}

function get(path) {
  // eslint-disable-next-line no-undef
  return fetch(buildPath(path), {
    method: 'GET',
  }).then(handleResponse);
}

function post(path, body) {
  console.log('body', body);
  // eslint-disable-next-line no-undef
  return fetch(buildPath(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(handleResponse);
}

export default {
  get,
  post,
};
