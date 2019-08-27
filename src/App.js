import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Modal from 'react-responsive-modal';
import Player from './components/Player'
import './App.css';
import Albums from './components/Albums';
import Track from './components/Track'
import Tracks from './components/Tracks';

class App extends Component {
  state = {
    modalOpen: false,
    dataRelease: [],
    displayAlbum: [],
    displayArtist: [],
    displayCover: [],
    displayTracks: [],
    playingTrack: '',
    search: '', 
    modalUse: ''
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
    app.setState({displayArtist: data.body.artists[0]})
    app.setState({displayCover: data.body.images[1]})
    app.setState({displayTracks: data.body.tracks.items})

  }, function(err) {
    console.error(err);
  })
  }

  getSearch = (app, search) => {
    this.spotifyApi.searchArtists(search)
      .then(function (data) {
        console.log('Search artists by "Love"', data.body.artists.items)
        app.setState({displayArtist: data.body.artists.items})
      }, function (err) {
        console.error(err);
      })
  }

  searchArtist = (app, id) => {
    // Get albums by a certain artist
    this.spotifyApi.getArtistAlbums(id)
      .then(function (data) {
        app.setState({ dataRelease: data.body.items })
      }, function (err) {
        console.error(err);
      });
  }

  onOpenModal = () => {
    this.setState({ modalOpen: true });
  };
 
  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handleClickAlbum = (idAlbum) => {
    this.getAlbum(this, idAlbum)
    this.setState({modalUse : 'tracks'})
    this.onOpenModal()
  }

  handleClickSearch = () => {
    this.setState({displayArtist: []})
    this.setState({modalUse: 'search'})
    this.onOpenModal()
  }

  handleClickTrack = (id) => {
    this.setState({playingTrack: id})
  }

  handleSearch = (e) => {
    this.getSearch(this, e.target.value)
  }

  handleClickSearchResult = (id) => {
    this.searchArtist(this, id)
    this.onCloseModal()
  }

  renderingSearch = () => {
    const artistsSearch = this.state.displayArtist.map((searchArtist) => <Track title={searchArtist.name} id={searchArtist.id} handleClick={this.handleClickSearchResult}/>)
    return(
      <div>
        <h3>Rechercher un artiste</h3>
      <input onChange={this.handleSearch}></input>
      {artistsSearch}
      </div>
    )
  }


  render() {
console.log(this.state)
    return (

      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <button onClick={this.handleClickSearch}>Search</button>
        <Modal open={this.state.modalOpen} onClose={this.onCloseModal} center>

          {this.state.modalUse === 'search' ?  this.renderingSearch()
          
          : <Tracks name={this.state.displayAlbum.name} 
                    artist={this.state.displayArtist} 
                    cover={this.state.displayCover} 
                    tracks={this.state.displayTracks}
                    handleClick={this.handleClickTrack}/> }
        </Modal>

        <Albums data={this.state.dataRelease} handleClick={this.handleClickAlbum}/>
        <Player />
        {/* <iframe src={`https://open.spotify.com/embed/album/${this.state.playingTrack}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
      </div>

    )
  }
}

export default App;
