const path = require('path');
const express = require('express');
const cors = require('cors');
const { listarCameras, tirarFoto } = require('./webcam');
const { servo } = require('./servo.js');
const { led } = require('./led.js');
const app = express();

app.use(cors());

app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

app.get('/', (req, res) => res.send('Olá!'));

app.get('/foto', (req, res) => {
  tirarFoto()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('Erro ao tirar foto');
      console.log(err);
      res.sendStatus(400);
    });
});

app.get('/led/:value', (req, res) => {
  const { value } = req.params;
  led(value);
  return res.sendStatus(200);
});

app.get('/motor/:value', (req, res) => {
  const { value } = req.params;
  servo(value);
  return res.sendStatus(200);
});

app.get('/cameras', (req, res) => {
  listarCameras().then(cameras => {
    res.json(cameras);
  });
});

app.listen(3000, () => console.log('Servidor escutando na porta 3000!'));
