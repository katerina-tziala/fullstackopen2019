import React from 'react';
import Image from './Image';

const CountryFlag = ({ country }) => {
    const flagStyle = { width: "auto", height: "100px" };
    const flagAlt = `flag of ${country.name}`;
    return (
        <p>
            <Image source={country.flag} alt={flagAlt} style={flagStyle} />
        </p>
    )
};

export default CountryFlag;