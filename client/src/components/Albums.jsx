import React from 'react'
import Album from './Album'

const Albums = ({data}) => {
    return(
    data.map((album) => <Album title={album.name}/>)
    )
}

export default Albums