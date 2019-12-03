import React from 'react';

const InputSearch = (props) => {
    return(
        <form className="searchForm" onSubmit={props.handleSubmitSearch}>
            <input onChange={props.handleSearchImages} type="text" placeholder="Enter search term here"/>
            <button onSubmit={props.handleSubmitSearch} type="submit">Search for images</button>
        </form>
    )
}

export default InputSearch;