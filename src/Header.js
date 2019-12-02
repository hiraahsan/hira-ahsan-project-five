import React from 'react';

const Header = (props) => {
    return(
        <div className="header-section">
            <div className="oneThirdSection">
                <img src={props.previewImg} />
            </div>

            <div className="theRest">
                <header>
                    <h1>Writer's Block</h1>
                </header>
            </div>
        </div>
    )
}

export default Header;