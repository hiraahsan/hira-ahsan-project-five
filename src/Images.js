import React from 'react';

const Images = (props) => {
    return(
        <div className="miniContainers">
            <input type="radio" name="radio" id={props.indexKey} value={props.previewImg} onChange={() => props.appendImages(props.handleChange)}/>
            <label htmlFor={props.indexKey}>
                <img src={props.previewImg} alt={props.alt}/>
            </label>
            <a href={props.linkToPage}>Link to full size</a>
        </div>
    )
}

export default Images;