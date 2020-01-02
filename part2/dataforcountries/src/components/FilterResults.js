import React from 'react';
import CountryListItem from './CountryListItem';

const FilterResults = (props) => {
    const displayCountries = () => props.countries.map(country =>
        <CountryListItem key={country.name} country={country} showCountry={props.showCountry} />
    );

    if (props.countries.length > 10) {
        return (
            <p>Too many matches, specify another filter!</p>
        )
    }
    return (
        <ul>
            {displayCountries()}
        </ul>
    )
};

export default FilterResults;