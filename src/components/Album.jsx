import React from 'react'

const Album = ({title, dataArtists, dataImages, id, handleClick, handleClickArtist}) => {
    
    const artist = dataArtists[0].name
    const srcImage = dataImages[1].url

    
    const handleClickAlbum = () => {
        handleClick(id)
    }

    const handleClickDisplayArtist = () => {
        handleClickArtist(dataArtists[0].id, artist)
    }
    return (
        <div className='album'>
            <img src={srcImage} onClick={handleClickAlbum} className='albumCover'/>
            <h1 onClick={handleClickAlbum} className='albumName'>{title}</h1>
            <h2 className='artistName' onClick={handleClickDisplayArtist}>{artist}</h2>
        </div>
    )
}

export default Album