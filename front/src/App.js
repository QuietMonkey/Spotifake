import React, {Component} from 'react'
import axios from 'axios'
import Player from './components/Player'
import './App.css';

class App extends Component {
  state = {
    data : []
  }
  render() {

    return (

      <div className="App">
        <Player />
      </div>
    )
  }
}

export default App;
