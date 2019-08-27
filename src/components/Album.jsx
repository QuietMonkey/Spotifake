import React from 'react'

const Album = ({title, dataArtists, dataImages, id, handleClick}) => {
    
    const artist = dataArtists[0].name
    const srcImage = dataImages[1].url

    const handleClickAlbum = () => {
        handleClick(id)
    }
    return (
        <div className='album'>
            <img src={srcImage} onClick={handleClickAlbum}/>
            <h1>{title}</h1>
            <h2>{artist}</h2>
        </div>
    )
}

export default Album