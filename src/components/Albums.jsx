import React from 'react'
import Album from './Album'

const Albums = ({ data, handleClick, handleClickArtist, title }) => {
    const displayAlbums = data.map((album) => <Album title={album.name}
                                                        dataArtists={album.artists}
                                                        dataImages={album.images}
                                                        id={album.id}
                                                        handleClick={handleClick}
                                                        handleClickArtist={handleClickArtist} />)
    return (
        <div className='albumsContainer'>
            <h2 className='titleAlbums'>{title}</h2>
            <div className='albums'>
                {displayAlbums}
            </div>
        </div>
    )
}

export default Albums