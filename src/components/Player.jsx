import React from 'react'
import ReactHowler from 'react-howler'

class Player extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialized: false,
      playing: true
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  handlePlay () {
    this.setState({
      playing: true
    })
  }

  handlePause () {
    this.setState({
      playing: false
    })
  }

  render () {
    if (this.state.initialized === true) {
      return (
        <div>
          <ReactHowler
            src='http://goldfirestudios.com/proj/howlerjs/sound.ogg'
            playing={this.state.playing}
          />
          <button onClick={this.handlePlay}>Play</button>
          <button onClick={this.handlePause}>Pause</button>
        </div>
      )
    } else {
      return (
        <div>
          <button
            className='full'
            onClick={e => this.setState({initialized: true})}
          >
            Initialize Auto Player
          </button>
        </div>
      )
    }
  }
}

export default Player