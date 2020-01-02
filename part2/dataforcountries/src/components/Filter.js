import React from 'react';

const Filter = (props) => {
    return (
        <>
            <span>find countries: </span>
            <input value={props.filter} onChange={props.handleFilterChange} />
        </>
    )
};

export default Filter;