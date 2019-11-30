import React from 'react';

const Images = (props) => {
    return(
        <div className="miniContainers">
            {/* <form onSubmit={props}> */}
            <input type="radio" name="radio" id={props.indexKey} value={props.previewImg} onChange={() => props.appendImages(props.handleChange)}/>
            <label htmlFor={props.indexKey}>
                <img src={props.previewImg}/>
            </label>
            {/* <button type="submit">Submit Image</button> */}
            <a href={props.linkToPage}>Link to full size</a>
            {/* </form> */}
        </div>
    )
}

export default Images;