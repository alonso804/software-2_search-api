import http from 'k6/http';

const host = 'http://localhost:3000';

export const options = {
  vus: 1000,
  duration: '60s',
};

const pokemons = ['bulbasaur', 'ivysaur', 'charizard', 'caterpie', 'kakuna', 'beedrill', 'clefairy']

export default function() {
  http.get(`${host}/search?name=${pokemons[Math.floor(Math.random() * pokemons.length)]}`);

  sleep(1);
}
