import React from 'react'
import Album from './Album'

const Albums = ({data, handleClick}) => {
    console.log(data)
    return(
    data.map((album) => <Album title={album.name}
                                dataArtists={album.artists}
                                dataImages={album.images}
                                id={album.id}
                                handleClick={handleClick}/>)
    )
}

export default Albums