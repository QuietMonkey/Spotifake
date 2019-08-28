import React, { Component } from 'react';

class PlayerV2 extends Component {
  state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
      trackName: "",
      artistName: "",
      albumName: "",
      playing: false,
      position: 0,
      duration: 1,
    }
  playerCheckInterval = null;

  componentWillReceiveProps() {
    this.setState({token: this.props.token})
  }

  
  render() {

    window.onSpotifyWebPlaybackSDKReady = () => {
      
      var player = new window.Spotify.Player({
        name: 'Spotifake',
        getOAuthToken: callback => {
          callback(this.state.token);
        },
        volume: 0.1
      })

      // Called when connected to the player created beforehand successfully
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
      this.setState({deviceId: device_id});

      const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.state.token}`
            },
          });
        });
      };

      play({
        playerInstance: player,
        spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
      });
    });

    // Connect to the player created beforehand, this is equivalent to 
    // creating a new device which will be visible for Spotify Connect
    player.connect();

    };

    const {
      token,
      loggedIn,
      trackName,
      artistName,
      albumName,
      error,
      playing
    } = this.state;
    
    return (
      <div className="App">
        {error && <p>Error: {error}</p>}
      <div>  
          <p>Artist: {artistName}</p>
          <p>Track: {trackName}</p>
          <p>Album: {albumName}</p>
          <p>
            <button onClick={() => this.onPrevClick()}>Previous</button>
            <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
            <button onClick={() => this.onNextClick()}>Next</button>
          </p>
        </div>
      </div>
    )
  }
}

export default PlayerV2