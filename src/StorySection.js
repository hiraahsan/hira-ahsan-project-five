import React from 'react';

const StorySection = (props) => {
    return(
        <div className="storytime">
            <div className="imageStored">
                <img src={props.appendImg}></img>
            </div>

            <div className="userText">
                <p>{props.textToBeAppended}</p>
            </div>
        </div>
    )
}

export default StorySection;