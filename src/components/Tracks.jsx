import React from 'react'
import Track from './Track';

const Tracks = ({name, artist, cover, tracks, id, handleClick, handleClickPlay}) => {

    const renderingTracks = () => tracks.map((track) => <Track title={track.name} 
                                                                id={track.id} 
                                                                handleClick={handleClick} />)

    const handleClickPlayAlbum = () => {
        handleClickPlay(id)
    }
    return(
        <div className='modalContent'>
            <div className='cover'>
                <img src={cover.url} onClick={handleClickPlayAlbum}/>
            </div>
            <h2>{name}</h2>
            <h3>{artist.name}</h3>
            {renderingTracks()}
        </div>
    )
}

export default Tracks