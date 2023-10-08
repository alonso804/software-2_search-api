import http from 'k6/http';

const host = 'http://localhost:4000';

export const options = {
  vus: 1000,
  duration: '30s',
};

export default function() {
  http.get(`${host}/poke/search?name=${Math.floor(Math.random() * 700)}`);

  sleep(1);
}
