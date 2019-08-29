import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Modal from 'react-responsive-modal'
import PlayerV5 from './components/PlayerV5'
import './App.css';
import Albums from './components/Albums'
import Track from './components/Track'
import Tracks from './components/Tracks'

class App extends Component {
  state = {
    token: '',
    logged: false,
    modalOpen: false,
    dataRelease: [],
    displayAlbum: [],
    displayArtist: [],
    displayCover: [],
    displayTracks: [],
    playingTrack: '17qjFoBop2OQwcncOTad1t',
    playingAlbum: '03cgEzN1C7KIQBzoH0rAQm',
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
      q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams
  }

  setAccessToken = () => {
    const params = this.getHashParams()
    const token = params.access_token
    if (token) {
      this.spotifyApi.setAccessToken(token)
      this.setState({ token: token})
      this.setState({ logged: true })
    }
  }

  getReleases = (app) => {
    // Retrieve new releases
    this.spotifyApi.getNewReleases({ limit: 10, offset: 0, country: 'SE' })
      .then(function (data) {
        app.setState({ dataRelease: data.body.albums.items })
        app.setState({ title: "Sorties Récentes"})
      }, function (err) {
        console.log("Something went wrong!", err)
      })
  }

  getAlbum = (app, idAlbum) => {
    this.spotifyApi.getAlbum(idAlbum)
      .then(function (data) {
        app.setState({ displayAlbum: data.body })
        app.setState({ displayArtist: data.body.artists[0] })
        app.setState({ displayCover: data.body.images[1] })
        app.setState({ displayTracks: data.body.tracks.items })

      }, function (err) {
        console.error(err)
      })
  }

  getSearch = (app, search) => {
    this.spotifyApi.searchArtists(search)
      .then(function (data) {
        console.log('Search artists by "Love"', data.body.artists.items)
        app.setState({ displayArtist: data.body.artists.items })
      }, function (err) {
        console.error(err)
      })
  }

  searchArtist = (app, id) => {
    // Get albums by a certain artist
    this.spotifyApi.getArtistAlbums(id)
      .then(function (data) {
        app.setState({ dataRelease: data.body.items })
      }, function (err) {
        console.error(err)
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
    this.setState({ modalUse: 'tracks' })
    this.onOpenModal()
  }

  handleClickSearch = () => {
    this.setState({ displayArtist: [] })
    this.setState({ modalUse: 'search' })
    this.onOpenModal()
  }

  handleClickTrack = (id) => {
    this.setState({ playingTrack: id })
  }

  handleSearch = (e) => {
    this.getSearch(this, e.target.value)
  }

  handleClickSearchResult = (id, title) => {
    this.searchArtist(this, id)
    this.onCloseModal()
    this.setState({ title : `Albums de ${title}` })
  }

  renderingSearch = () => {
    const artistsSearch = this.state.displayArtist.map((searchArtist) => <Track title={searchArtist.name} id={searchArtist.id} handleClick={this.handleClickSearchResult} />)
    return (
      <div className='modalContent'>
        <h3>Rechercher un artiste</h3>
        <input onChange={this.handleSearch}></input>
        {artistsSearch}
      </div>
    )
  }

  handleClickPlay = (id) => {
    this.setState({playingAlbum: id})
    this.onCloseModal()
  }


  render() {
    console.log(this.state)
    return (

      <div className="App">
        <div className='header'>
          {this.state.logged ? null : <a href='http://localhost:8888' > Login to Spotify </a>}
          {this.state.logged ? <button onClick={this.handleClickSearch}>Search</button> : null}
        </div>

        <Modal open={this.state.modalOpen} onClose={this.onCloseModal} center>

          {this.state.modalUse === 'search' ? this.renderingSearch()

            : <Tracks name={this.state.displayAlbum.name}
              artist={this.state.displayArtist}
              cover={this.state.displayCover}
              tracks={this.state.displayTracks}
              id={this.state.displayAlbum.id}
              handleClick={this.handleClickTrack}
              handleClickPlay={this.handleClickPlay} />}

        </Modal>

        <h2 className='titleAlbums'>{this.state.title}</h2>
        <Albums data={this.state.dataRelease} 
                handleClick={this.handleClickAlbum} 
                handleClickArtist={this.handleClickSearchResult} />

        {/* <Player url={this.state.playingTrack} /> */}
        {/* <div className='playerWidget'>
        <iframe src={`https://open.spotify.com/embed/album/${this.state.playingAlbum}`} width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div> */}

        <PlayerV5 token={this.state.token} idTrack={this.state.playingTrack}/>


        {/* <SpotifyPlayer
          token={this.state.token}
          uris={[`spotify:track:${this.state.playingTrack}`]}
          name= {'Spotifake'}
        />;  */}

      </div>

    )
  }
}

export default App
