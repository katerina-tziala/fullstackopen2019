import React from 'react';

const CountryInfo = ({infoKey, country}) => {
    return (
        <p>
            <span>{infoKey}: </span>
            <span>{country[infoKey]}</span>
        </p>
    )
};

export default CountryInfo;