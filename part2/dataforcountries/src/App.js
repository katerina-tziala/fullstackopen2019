import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import FilterResults from './components/FilterResults';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('');
  const [selectedCountry, setSelectedCountry] = useState()
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(undefined);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const countryName = (country) => country.name.toLowerCase();
  const filterCountries = () => [...countries].filter(country => countryName(country).includes(filter.toLowerCase()));
  let countriesToShow = filterCountries();
  const showCountry = (selectedCountryName) => {
    setSelectedCountry(undefined);
    const selectedCountry = [...countries].find(country => countryName(country) === selectedCountryName.toLowerCase());
    setSelectedCountry(selectedCountry);
  };

  const showCountryDetails = () => {
    if (selectedCountry) {
      return (
        <>
          <hr/>
          <CountryDetails country={selectedCountry}/>
        </>
      )
    }
    return (
      <>
      </>
    )
  }

  return (
    <>
      <h1>Data for Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <FilterResults countries={countriesToShow} showCountry={showCountry} />
      {showCountryDetails()}
    </>
  );
}

export default App;
