import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Player from './components/Player'
import './App.css';
import Albums from './components/Albums';

class App extends Component {
  state = {
    accessToken: '',
    dataRelease: []
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



  render() {

    return (

      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <Albums data={this.state.dataRelease}/>
        <Player />
      </div>

    )
  }
}

export default App;
