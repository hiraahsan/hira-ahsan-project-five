import React from 'react';

const Details = (props) => {
    return(
        <details>
            <summary>
                Welcome to Writer’s Block! Select this to view instructions below:
            </summary>
            <ol>
                <li>Search for an image. </li>
                <li>Select the image you want from the image section below - you will need to scroll through them. </li>
                <li>Enter in some text to go along with the image.</li>
                <li>Click submit button and there you go! The story has began</li>
                <li>Please note: you can only submit one image + text at a time, the page will need to be refreshed and process repeated for any further ones. We are working on a login page so users can save their items.</li>
            </ol>
        </details>
    )
}

export default Details;