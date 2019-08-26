import React from 'react'

const Album = ({title, dataArtists, dataImages}) => {
    
    const artist = dataArtists[0].name
    const srcImage = dataImages[1].url
    return (
        <div className='album'>
            <img src={srcImage}/>
            <h1>{title}</h1>
            <h2>{artist}</h2>
        </div>
    )
}

export default Album