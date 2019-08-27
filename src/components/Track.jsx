import React from 'react'

const Track = ({title, id, handleClick}) => {

    const handleClickTrack = () => {
        handleClick(id)
    }

    return(
        <h4 onClick={handleClickTrack}>{title}</h4>
    )
}

export default Track