import React from 'react'
import Track from './Track';

const Tracks = ({name, artist, cover, tracks, handleClick}) => {

    const renderingTracks = () => tracks.map((track) => <Track title={track.name} 
                                                                id={track.id} 
                                                                handleClick={handleClick} />)
    return(
        <div className='modalContent'>
            <img src={cover.url}/>
            <h2>{name}</h2>
            <h3>{artist.name}</h3>
            {renderingTracks()}
        </div>
    )
}

export default Tracks