import React from 'react';

const Filter = (props) => {
    return (
        <>
            <span>filter shown with: </span>
            <input value={props.filter} onChange={props.handleFilterChange} />
        </>
    );
};

export default Filter;