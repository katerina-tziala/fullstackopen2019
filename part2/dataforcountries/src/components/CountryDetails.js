import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Languages from './Languages';
import CountryFlag from './CountryFlag';
import CountryInfo from './CountryInfo';
import WeatherDetails from './WeatherDetails';

const CountryDetails = ({ country }) => {
    const apiKey = '_API_KEY_';
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.name}`;
    const [weather, setWeather] = useState()
    useEffect(() => {
        axios
            .get(weatherUrl)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [weatherUrl])


    return (
        <div>
            <h1>{country.name}</h1>
            <CountryInfo infoKey="capital" country={country} />
            <CountryInfo infoKey="population" country={country} />
            <Languages languages={country.languages} />
            <CountryFlag country={country} />
            <h2>Weather in {country.name}</h2>
            <WeatherDetails weather={weather} />
        </div>
    )
};

export default CountryDetails;