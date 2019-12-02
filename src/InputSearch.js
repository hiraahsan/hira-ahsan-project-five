import React from 'react';

const InputSearch = (props) => {
    return(
        <form onSubmit={props.handleSubmitSearch}>
            <input onChange={props.handleSearchImages} type="text"/>
            <button type="submit">Search for images</button>
        </form>
    )
}

export default InputSearch;