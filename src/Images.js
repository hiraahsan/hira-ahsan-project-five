import React from 'react';

const Images = (props) => {
    return(
        // <>
        <div className="miniContainers">
            <input type="radio" name="radio" id={props.indexKey} value={props.previewImg} onChange={() => props.appendImages(props.handleClick)}/>
            <label htmlFor={props.indexKey}>
            <img src={props.previewImg}/>
            </label>
            <a href={props.linkToPage}>Link to full size</a>
        </div>
        // </>

    )
}

export default Images;