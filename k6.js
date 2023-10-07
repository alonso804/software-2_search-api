import http from 'k6/http';

const host = 'http://localhost:4000';

export const options = {
  vus: 1000,
  duration: '60s',
};

export default function() {
  http.get(`${host}/search?name=${Math.floor(Math.random() * 700)}`);

  sleep(1);
}
