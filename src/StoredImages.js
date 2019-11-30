import React from 'react';

const StoredImages = (props) => {
    return(
        <>
                <div className="imgContainer">
                <img id={props.id} src={props.storedImg}></img>
            </div>
        </>
    )
}

export default StoredImages;