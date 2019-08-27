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
                    src='https://p.scdn.co/mp3-preview/07c61d627e0537fa0d7f11bbab0c763bd9165d1b?cid=873b1148a2b94911bf9e848a60142cca'
                    playing={this.state.playing}
                />
                <button onClick={this.handleClickPlay}>{this.state.content}</button>
            </div>
        )
    }
}


export default Player