import React, { Component } from 'react';
import { isMethod } from '@babel/types';

class PlayerV2 extends Component {
  state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      spotify_uri: "spotify:track:17qjFoBop2OQwcncOTad1t",
      trackName: "",
      artistName: "",
      albumName: "",
      playing: false,
    }


  componentWillReceiveProps() {
    this.setState({token: this.props.token})
    if(this.props.idTrack){
    this.setState({spotify_uri: `spotify:track:${this.props.idTrack}`})
  }}

  renderPlayer = () => {return(window.onSpotifyWebPlaybackSDKReady = () => {
      
      
    var player = new window.Spotify.Player({
      name: 'Spotifake',
      getOAuthToken: callback => {
        callback(this.state.token);
      },
      volume: .4
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
      spotify_uri: this.state.spotify_uri,
    });
  });
  
  // Connect to the player created beforehand, this is equivalent to 
  // creating a new device which will be visible for Spotify Connect
  player.connect();

  console.log(player)
  
  
  });}


  
  render() {

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
            <button onClick={this.renderPlayer()}>{playing ? "Pause" : "Play"}</button>
            <button >Next</button>
          </p>
        </div>
      </div>
    )
  }
}

export default PlayerV2