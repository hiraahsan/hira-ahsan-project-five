import React from 'react';

const StoredImages = (props) => {
    return(
        <>
        <div className="storedImageSection">
            <img alt="" id={props.id} src={props.storedImg}></img>
            </div>
        </>
    )
}

export default StoredImages;