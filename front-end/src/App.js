import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import BaseLayout from './layout/BaseLayout';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './components/Loading';

import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

import { led, motor } from './api';

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagemUrl: null,
      loading: false,
      sliderValue: 1500
    };

    motor(this.state.sliderValue);
    this.toggleLed(false);
  }

  requisitarImagem = () => {
    this.setState({ loading: true, imagemUrl: null }, () => {
      axios
        .get(`${API_URL}/foto`)
        .then(res => {
          this.setState({
            imagemUrl: `${API_URL}/imagens/${res.data}`,
            loading: false
          });
        })
        .catch(() => {
          toast.error('Ocorreu um erro ao requisitar imagem');
          this.setState({ loading: false });
        });
    });
  };

  onSliderChange = value => {
    console.log(value);
    this.setState({
      sliderValue: value
    });

    motor(value);
  };

  toggleLed = value => {
    this.setState(
      state => ({
        led: value !== undefined ? value : !state.led
      }),
      () => led(this.state.led)
    );
  };

  render() {
    return (
      <>
        <Navbar />
        <BaseLayout>
          <button className="btn btn-info" onClick={this.requisitarImagem}>
            Tirar foto
          </button>
          <div className="row">
            <div className="col-6">
              {this.state.imagemUrl ? (
                <img
                  className="img-fluid mt-4"
                  src={this.state.imagemUrl}
                  alt="Imagem da webcam do raspberry"
                />
              ) : this.state.loading ? (
                <Loading />
              ) : null}
            </div>
            <div className="col-6">
              <Slider
                min={500}
                max={2500}
                step={250}
                onChange={this.onSliderChange}
                value={this.state.sliderValue}
              />
              <button
                className={`btn ${this.state.led ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => this.toggleLed()}>
                Luz
              </button>
            </div>
          </div>
        </BaseLayout>
        <ToastContainer />
      </>
    );
  }
}

export default App;
