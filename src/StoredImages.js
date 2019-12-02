import React from 'react';

const StoredImages = (props) => {
    return(
        <>
            <div className="imageSection"><img id={props.id} src={props.storedImg}></img></div>
            <div className="textSection"><p id={props.storedTextId}>{props.storedText}</p></div>
        </>
    )
}

export default StoredImages;