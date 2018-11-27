const Gpio = require('pigpio').Gpio;

const led = new Gpio(17, { mode: Gpio.OUTPUT });

function writeToLed(value) {
  led.pwmWrite(value);
}

module.exports = {
  led: writeToLed
};