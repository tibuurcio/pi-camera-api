const path = require('path');
const NodeWebcam = require('node-webcam');

const defaultOptions = {
  width: 640,
  height: 480,
  quality: 100,
  //Delay to take shot
  delay: 0,
  //Save shots in memory
  saveShots: false,
  // [jpeg, png] support varies
  // Webcam.OutputTypes
  output: 'jpeg',

  //Which camera to use
  //Use Webcam.list() for results
  //false for default device
  device: false,
  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes
  callbackReturn: 'location',
  //Logging
  verbose: true
};

const Webcam = NodeWebcam.create(defaultOptions);
const defaultPath = path.join(__dirname, 'imagens');

function tirarFoto() {
  return new Promise((resolve, reject) => {
    const agora = new Date();
    const nomeArquivo = `${agora.toISOString()}.jpeg`;
    NodeWebcam.capture(path.join(defaultPath, nomeArquivo), defaultOptions, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(nomeArquivo);
      }
    });
  });
}

function listarCameras() {
  return new Promise(resolve => {
    Webcam.list(resolve);
  });
}

module.exports = {
  tirarFoto,
  listarCameras
};
