import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import BaseLayout from './layout/BaseLayout';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './components/Loading';

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagemUrl: null,
      loading: false
    };
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
          </div>
        </BaseLayout>
        <ToastContainer />
      </>
    );
  }
}

export default App;
