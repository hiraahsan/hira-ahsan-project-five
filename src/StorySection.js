import React from 'react';

const StorySection = (props) => {
    return(
        <>
        <div className="storyContainer">
            <p id={props.storedTextId}>{props.storedText}</p>
        </div>
        </>
    )
}

export default StorySection;