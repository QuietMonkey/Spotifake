import React from 'react'
import Album from './Album'

const Albums = ({data, handleClick, handleClickArtist}) => {
    const displayAlbums = data.map((album) => <Album title={album.name}
                                                    dataArtists={album.artists}
                                                    dataImages={album.images}
                                                    id={album.id}
                                                    handleClick={handleClick}
                                                    handleClickArtist={handleClickArtist}/>)
    return(
        <div className='albums'>
            {displayAlbums}
        </div>
    )
}

export default Albums