import React, { Component } from 'react'
import ReactHowler from 'react-howler'

class Player extends Component {

    state = {
        playing: false,
        content: '>'
    }

    handleClickPlay = () => {
        this.setState({ playing: !this.state.playing })
        !this.state.playing ? this.setState({content : '||'}) : this.setState({content : '>'})
    }

    urlSong = `spotify:track:${this.props.url}`

    render() {
        return (
            <div>
                <ReactHowler
                    src= {this.urlSong}
                    playing={this.state.playing}
                />
                <button onClick={this.handleClickPlay}>{this.state.content}</button>
            </div>
        )
    }
}


export default Player