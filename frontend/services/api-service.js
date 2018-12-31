const base = '/api';

function buildPath(path) {
  return base + path;
}

function get(path) {
  return fetch(buildPath(path), {
    method: 'GET'
  }).then(result => result.json());
}

function post(path, body) {
  return fetch(buildPath(path), {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  }).then(result => result.json());
}

export default {
  get,
  post,
};