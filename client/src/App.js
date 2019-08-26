import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Player from './components/Player'
import './App.css';
import Albums from './components/Albums';

class App extends Component {
  state = {
    dataRelease: []
  }

  spotifyApi = new SpotifyWebApi({
    clientId: '873b1148a2b94911bf9e848a60142cca',
    clientSecret: '20c5ee21a3004ec7a8078086398df0c9',
    redirectUri: 'http://localhost:3000'
  });

  componentDidMount() {
    this.setAccessToken()
    this.getReleases(this)
  }

  setAccessToken = () => {
    this.spotifyApi.setAccessToken('BQCdm9_zAiG4Muh4h4spcwokUy3uzkLusKneqshnbbYyuKRbrgk_ycev_t8fJwaOJ9KcHOFTywMr0lCu0gvENQNA5mD7ChlvCAe756_GVVL2hogZGk8vKafRujAwCqYEA38heqiAugIgprA58RhuiHooy_rXS-yNUCctTj1RJY-whaXt2yRV')
  }

  getReleases = (objProj) => {
    // Retrieve new releases
    this.spotifyApi.getNewReleases({ limit: 10, offset: 0, country: 'SE' })
      .then(function (data) {
        objProj.setState({dataRelease : data.body.albums.items})
      }, function (err) {
        console.log("Something went wrong!", err)
      })
  }



  render() {
    console.log(this.state.dataRelease)
    return (

      <div className="App">
        <Albums data={this.state.dataRelease}/>
        <Player />
      </div>

    )
  }
}

export default App;
