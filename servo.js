const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, { mode: Gpio.OUTPUT });

// let pulseWidth = 1000;
// let increment = 100;

// setInterval(() => {
//   motor.servoWrite(pulseWidth);

//   pulseWidth += increment;
//   if (pulseWidth >= 2000) {
//     increment = -100;
//   } else if (pulseWidth <= 1000) {
//     increment = 100;
//   }
// }, 1000);

function _writeToServoAsync(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Voltando para 0');
      motor.servoWrite(value);
      resolve();
    }, 200);
  });
}

function servo(value) {
  console.log('Escrevendo no servo valor:', value);
  motor.servoWrite(value);
  _writeToServoAsync(0);
}

module.exports = {
  servo
};

