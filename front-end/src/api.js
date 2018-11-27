import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function motor(value) {
  axios.get(`${API_URL}/motor/${value}`);
}

function led(on) {
  if (on) {
    axios.get(`${API_URL}/led/255`);
  } else {
    axios.get(`${API_URL}/led/0`);
  }
}

function imagem() {
  return axios.get(`${API_URL}/foto`).then(res => res.data);
}

function getImagemUrl(nomeArquivo) {
  return `${API_URL}/imagens/${nomeArquivo}`;
}

export { motor, led, imagem, getImagemUrl };
