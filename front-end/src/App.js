import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import BaseLayout from './layout/BaseLayout';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './components/Loading';

import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

import { led, motor, imagem, getImagemUrl } from './api';

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagemUrl: null,
      loading: false,
      sliderValue: 1500,
      modoContinuo: false
    };

    motor(this.state.sliderValue);
    this.toggleLed(false);
  }

  requisitarImagem = () => {
    this.setState({ loading: true, imagemUrl: null }, () => {
      imagem()
        .then(nomeArquivo => {
          this.setState({ imagemUrl: getImagemUrl(nomeArquivo), loading: false });
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

  toggleModoContinuo = () => {
    this.setState(
      state => {
        return {
          modoContinuo: !state.modoContinuo
        };
      },
      () => {
        if (this.state.modoContinuo) {
          this.modoContinuo();
        }
      }
    );
  };

  modoContinuo = () => {
    console.log('Modo contínuo, requisitando imagem');
    imagem().then(nomeArquivo => {
      console.log('Imagem chegou:', nomeArquivo);
      this.setState({ imagemUrl: getImagemUrl(nomeArquivo) });
      if (this.state.modoContinuo) {
        console.log('Ainda modo contínuo, chamando novamente');
        return this.modoContinuo();
      }
    });
  };

  render() {
    return (
      <>
        <Navbar />
        <BaseLayout>
          <div className="row">
            <div className="col-6">
              <div className="btn-group d-flex">
                <button className="btn btn-info w-100 mr-1" onClick={this.requisitarImagem}>
                  Tirar foto
                </button>
                <button
                  className={`btn w-100 ${
                    this.state.modoContinuo ? 'btn-success' : 'btn-secondary'
                  }`}
                  onClick={this.toggleModoContinuo}>
                  Modo contínuo
                </button>
              </div>

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
              <button
                className={`btn btn-block mb-4 ${this.state.led ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => this.toggleLed()}>
                Luz
              </button>
              <Slider
                min={500}
                max={2500}
                step={500}
                onChange={this.onSliderChange}
                value={this.state.sliderValue}
              />
              <div className="text-center">Valor: {this.state.sliderValue}</div>
            </div>
          </div>
        </BaseLayout>
        <ToastContainer />
      </>
    );
  }
}

export default App;
