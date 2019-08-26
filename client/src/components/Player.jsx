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

    render() {
        return (
            <div>
                <ReactHowler
                    src='http://goldfirestudios.com/proj/howlerjs/sound.ogg'
                    playing={this.state.playing}
                />
                <button onClick={this.handleClickPlay}>{this.state.content}</button>
            </div>
        )
    }
}


export default Player