import React from 'react'
import Album from './Album'

const Albums = ({data}) => {
    console.log(data)
    return(
    data.map((album) => <Album title={album.name}
                                dataArtists={album.artists}
                                dataImages={album.images}/>)
    )
}

export default Albums