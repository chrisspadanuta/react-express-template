const base = '/api/';

function buildPath(path) {
  return base + path;
}

function get(path) {
  return fetch(buildPath(path), {
    method: 'GET'
  })
}

function post(path, body) {
  return fetch(buildPath(path), {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export default {
  get,
  post,
};