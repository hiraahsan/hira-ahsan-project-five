import React from 'react';

const Preview = (props) => {
    return(
        <div href={`#${props.id}`} className="x">
            <img alt="" href={`#${props.id}`} src={props.storedImg}></img>
        </div>
    )
}

export default Preview;