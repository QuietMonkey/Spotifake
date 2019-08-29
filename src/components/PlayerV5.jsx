import React, { Component } from 'react';
import { isMethod } from '@babel/types';

class PlayerV2 extends Component {
    state = {
        token: "",
        deviceId: "",
        loggedIn: false,
        error: "",
        spotify_uri: "",
        trackName: "",
        artistName: "",
        albumName: "",
        playing: false,
    }

    componentDidMount = async() => {
        await this.renderPlayer(this.state.spotify_uri)
    }

    componentWillReceiveProps = async() => {
        this.setState({ token: this.props.token })
        if (this.props.idTrack !== this.state.spotify_uri){
            await (this.setState({spotify_uri: this.props.idTrack}))
            await this.newTrack(this.state.spotify_uri)
        }
    }

    renderPlayer(IDspotify_uri) {
        return (window.onSpotifyWebPlaybackSDKReady = () => {

            this.setState({
                player: new window.Spotify.Player({
                    name: 'Spotifake',
                    getOAuthToken: callback => {
                        callback(this.state.token);
                    },
                    volume: .4
                })
            })

            this.state.player.on('player_state_changed', state => this.onStateChanged(state));

            // Called when connected to the player created beforehand successfully
            this.state.player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id)
                this.setState({ deviceId: device_id });

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
                    playerInstance: this.state.player,
                    spotify_uri: `spotify:track:${IDspotify_uri}`,
                });
            });

            

            // Connect to the player created beforehand, this is equivalent to 
            // creating a new device which will be visible for Spotify Connect
            this.state.player.connect();
            

        });
    }

    togglePlayPause = () => {
        this.state.player.togglePlay()
    }

    previousSong = () => {
        this.state.player.previousTrack()
    }

    nextSong = () => {
        this.state.player.nextTrack()
    }

    newTrack = async (IDspotify_uri) => {
        this.state.player.disconnect()

        this.state.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id)
            this.setState({ deviceId: device_id });

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
                playerInstance: this.state.player,
                spotify_uri: `spotify:track:${IDspotify_uri}`,
            });
        });



        // Connect to the player created beforehand, this is equivalent to 
        // creating a new device which will be visible for Spotify Connect
        this.state.player.connect();
    }

    
  // when we receive a new update from the player
  onStateChanged(state) {
    // only update if we got a real state
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    } else {
      // state was null, user might have swapped to another device
      this.setState({ error: "Looks like you might have swapped to another device?" });
    }
  }

        
    

    render() {

        const {
            trackName,
            artistName,
            albumName,
            error,
            playing
        } = this.state;

        return (
            <div className="Player">
                {error && <p>Error: {error}</p>}
                <div>
                    <p>Artist: {artistName}</p>
                    <p>Track: {trackName}</p>
                    <p>Album: {albumName}</p>
                    <p>
                        <button onClick={this.previousSong}>Previous</button>
                        <button onClick={this.togglePlayPause}>{playing ? "Pause" : "Play"}</button>
                        <button onClick={this.nextSong}>Next</button>
                        <button onClick={this.newTrack}>TEST</button>
                    </p>
                </div>
            </div>
        )
    }
}

export default PlayerV2