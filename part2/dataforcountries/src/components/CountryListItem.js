import React from 'react';
import Button from './Button';

const CountryListItem = (props) => {
    return (
        <li>
            <span>{props.country.name}  </span>
            <Button handleClick={() => props.showCountry(props.country.name)} text="show" />
        </li>
    )
};

export default CountryListItem;