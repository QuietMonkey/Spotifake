import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Modal from 'react-responsive-modal';
import Player from './components/Player'
import './App.css';
import Albums from './components/Albums';
import Tracks from './components/Tracks';

class App extends Component {
  state = {
    modalOpen: false,
    dataRelease: [],
    displayAlbum: []
  }
  

  componentDidMount() {
    this.setAccessToken()
    this.getReleases(this)
  }

  spotifyApi = new SpotifyWebApi()

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  setAccessToken = () => {
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      this.spotifyApi.setAccessToken(token);
    }
  }

  getReleases = (app) => {
    // Retrieve new releases
    this.spotifyApi.getNewReleases({ limit: 10, offset: 0, country: 'SE' })
      .then(function (data) {
        app.setState({dataRelease : data.body.albums.items})
      }, function (err) {
        console.log("Something went wrong!", err)
      })
  }

  getAlbum = (app, idAlbum) => {
    this.spotifyApi.getAlbum(idAlbum)
  .then(function(data) {
    
    app.setState({displayAlbum: data.body})
  }, function(err) {
    console.error(err);
  })
  }

  onOpenModal = () => {
    this.setState({ modalOpen: true });
  };
 
  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handleClickAlbum = (idAlbum) => {
    this.getAlbum(this, idAlbum)
    this.onOpenModal()
  }



  render() {
console.log(this.state)
    return (

      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        
        <Modal open={this.state.modalOpen} onClose={this.onCloseModal} center>
          <Tracks name={this.state.displayAlbum.name}/>
        </Modal>

        <Albums data={this.state.dataRelease} handleClick={this.handleClickAlbum}/>
        <Player />
      </div>

    )
  }
}

export default App;
