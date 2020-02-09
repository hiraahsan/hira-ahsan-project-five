import React from 'react';

const Preview = (props) => {
    return(
        < >
        <a href={`#${props.id}`}>
            <img alt={props.alt} src={props.storedImg}></img>
        </a>
        </>
    )
}

export default Preview;