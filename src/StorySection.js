import React from 'react';

const StorySection = (props) => {
    return(
        <>
        {/* // <div className="storytime"> */}
        <div className="storyContainer">
            <p key={props.key} id={props.storedTextId}>{props.storedText}</p>
            </div>
        {/* // </div> */}
        </>
    )
}

export default StorySection;